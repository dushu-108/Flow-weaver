import Workflow from '../models/Workflow.js';

async function createNewWorkflow(userId, name) {
  const newWorkflow = new Workflow({
    name: name || 'Untitled Workflow',
    userId,
    isActive: false,
    nodes: [],
    edges: []
  });
  return await newWorkflow.save();
}

async function getUserWorkflows(userId) {
  return await Workflow.find({ userId }).sort({ createdAt: -1 });
}

async function getWorkflowById(workflowId, userId) {
  const workflow = await Workflow.findOne({ _id: workflowId, userId });
  if (!workflow) throw new Error('Workflow not found');
  return workflow;
}

async function saveWorkflowCanvas(workflowId, userId, nodes, edges) {
  const updatedWorkflow = await Workflow.findOneAndUpdate(
    { _id: workflowId, userId },
    { $set: { nodes, edges } },
    { new: true }
  );
  if (!updatedWorkflow) throw new Error('Workflow access restricted or not found');
  return updatedWorkflow;
}

async function toggleWorkflowStatus(workflowId, userId, isActive) {
  const updatedWorkflow = await Workflow.findOneAndUpdate(
    { _id: workflowId, userId },
    { $set: { isActive } },
    { new: true }
  );
  if (!updatedWorkflow) throw new Error('Workflow access restricted or not found');
  return updatedWorkflow;
}

export default { createNewWorkflow, getUserWorkflows, getWorkflowById, saveWorkflowCanvas, toggleWorkflowStatus };