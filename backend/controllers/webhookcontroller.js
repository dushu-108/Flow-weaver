import Workflow from '../models/Workflow.js';
import ExecutionLog from '../models/Executionlog.js';
import MetricCache from '../models/Metriccache.js';
import _ from 'lodash';
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: process.env.SMTP_SECURE === 'true' || false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});


async function runInterpreter(workflow, incomingPayload) {
  const startTime = Date.now();
  const { nodes, edges } = workflow;
  const executionSteps = [];
  let status = 'SUCCESS';

  let currentNode = nodes.find(n => n.type === 'webhookTrigger');
  if (!currentNode) return;

  try {
    while (currentNode) {
      executionSteps.push({
        nodeId: currentNode.id,
        nodeType: currentNode.type,
        status: 'SUCCESS'
      });

      let nextNodeId = null;

      if (currentNode.type === 'webhookTrigger') {
        const edgeMatch = edges.find(e => e.source === currentNode.id);
        if (edgeMatch) nextNodeId = edgeMatch.target;
      }
      
      else if (currentNode.type === 'conditionFilter') {
        const { field, operator, value } = currentNode.data || {};
        const liveDataValue = _.get(incomingPayload, field);
        let evaluation = false;

        if (operator === '==') evaluation = String(liveDataValue) === String(value);
        if (operator === '>')  evaluation = Number(liveDataValue) > Number(value);
        if (operator === '<')  evaluation = Number(liveDataValue) < Number(value);

        const edgeMatch = edges.find(e => 
          e.source === currentNode.id && 
          e.sourceHandle?.toUpperCase() === (evaluation ? 'TRUE-OUTPUT' : 'FALSE-OUTPUT')
        );
        if (edgeMatch) nextNodeId = edgeMatch.target;
      } 
      
      else if (currentNode.type === 'slackAction') {
        const { url, message } = currentNode.data || {};
        
        if (url && message) {
          const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: message })
          });
          
          if (!response.ok) {
            throw new Error(`Slack API error: ${response.status} ${response.statusText}`);
          }
        }

        const edgeMatch = edges.find(e => e.source === currentNode.id);
        if (edgeMatch) nextNodeId = edgeMatch.target;
      }
      
      else if (currentNode.type === 'emailAction') {
        const { to, subject, body } = currentNode.data || {};
        
        if (to && subject && body) {
          await transporter.sendMail({
            from: process.env.SMTP_USER || '"FlowWeaver" <no-reply@flowweaver.com>',
            to,
            subject,
            text: body,
          });
        } else {
          throw new Error('Email Action missing required fields: to, subject, or body');
        }

        const edgeMatch = edges.find(e => e.source === currentNode.id);
        if (edgeMatch) nextNodeId = edgeMatch.target;
      }

      currentNode = nextNodeId ? nodes.find(n => n.id === nextNodeId) : null;
    }
  } catch (error) {
    status = 'FAILED';
    if (executionSteps.length > 0) {
      executionSteps[executionSteps.length - 1].status = 'FAILED';
      executionSteps[executionSteps.length - 1].errorDetails = error.message;
    }
  }

  const duration = Date.now() - startTime;

  const log = new ExecutionLog({
    workflowId: workflow._id,
    status,
    incomingPayload,
    executionSteps,
    totalExecutionTimeMs: duration
  });
  await log.save();

  await MetricCache.findOneAndUpdate(
    { workflowId: workflow._id },
    {
      $inc: {
        totalRuns: 1,
        successfulRuns: status === 'SUCCESS' ? 1 : 0,
        failedRuns: status === 'FAILED' ? 1 : 0,
        rollingExecutionTimeSum: duration
      }
    },
    { upsert: true }
  );
}

const handleIncomingWebhook = async (req, res) => {
  try {
    const workflow = await Workflow.findById(req.params.id);
    if (!workflow) return res.status(404).json({ message: 'Pipeline document missing' });
    if (!workflow.isActive) return res.status(400).json({ message: 'Pipeline is currently paused' });

    runInterpreter(workflow, req.body);

    res.status(200).json({ success: true, message: 'Execution initiated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

async function getWorkflowAnalyticsSummary(workflowId) {
  const cache = await MetricCache.findOne({ workflowId });
  if (!cache || cache.totalRuns === 0) {
    return { totalExecutions: 0, successRate: '100%', averageLatency: '0ms' };
  }
  return {
    totalExecutions: cache.totalRuns,
    successRate: ((cache.successfulRuns / cache.totalRuns) * 100).toFixed(1) + '%',
    averageLatency: Math.round(cache.rollingExecutionTimeSum / cache.totalRuns) + 'ms'
  };
}

async function getWorkflowHistoryList(workflowId) {
  return await ExecutionLog.find({ workflowId })
    .sort({ createdAt: -1 })
    .limit(50)
    .select('status totalExecutionTimeMs createdAt');
}

export default { handleIncomingWebhook, getWorkflowAnalyticsSummary, getWorkflowHistoryList, runInterpreter };