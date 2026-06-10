import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import {
  ReactFlow,
  Controls,
  Background,
  Position,
  useReactFlow,
  ReactFlowProvider,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import WebhookTriggerNode from '../components/nodes/WebhookTriggerNode';
import ConditionFilterNode from '../components/nodes/ConditionFilterNode';
import SlackActionNode from '../components/nodes/SlackActionNode';
import EmailActionNode from '../components/nodes/EmailActionNode';
import { useStore } from '../store';

const nodeTypes = {
  webhookTrigger: WebhookTriggerNode,
  conditionFilter: ConditionFilterNode,
  slackAction: SlackActionNode,
  emailAction: EmailActionNode,
};

const nodePalette = [
  { type: 'webhookTrigger', label: 'Webhook Trigger', icon: '🪝', color: '#06b6d4' },
  { type: 'conditionFilter', label: 'Condition Filter', icon: '🔀', color: '#10b981' },
  { type: 'slackAction', label: 'Slack Action', icon: '💬', color: '#a855f7' },
  { type: 'emailAction', label: 'Email Action', icon: '📧', color: '#f97316' },
];

function FlowCanvas() {
  const { id: workflowId } = useParams();
  const { nodes, edges, setNodes, setEdges, onNodesChange, onEdgesChange, onConnect, addNode } = useStore();
  const reactFlowInstance = useReactFlow();
  const reactFlowRef = useRef(null);

  useEffect(() => {
    async function loadWorkflow() {
      if (!workflowId) return;
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`http://localhost:4000/api/workflows/${workflowId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const { nodes: loadedNodes, edges: loadedEdges } = res.data.data;
        if (loadedNodes && loadedNodes.length > 0) setNodes(loadedNodes);
        if (loadedEdges && loadedEdges.length > 0) setEdges(loadedEdges);
      } catch (err) {
        toast.error('Failed to load workflow data');
      }
    }
    loadWorkflow();
  }, [workflowId, setNodes, setEdges]);

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback((event) => {
    event.preventDefault();
    const type = event.dataTransfer.getData('application/reactflow');
    if (!type) return;

    const bounds = reactFlowRef.current?.getBoundingClientRect();
    if (!bounds) return;

    const position = reactFlowInstance.screenToFlowPosition({
      x: event.clientX - bounds.left,
      y: event.clientY - bounds.top,
    });

    const newNode = {
      id: `${type}-${Date.now()}`,
      type: type,
      position,
      data: {
        url: type === 'webhookTrigger' ? 'https://webhook.example.com/trigger' : '',
        field: type === 'conditionFilter' ? '' : undefined,
        operator: type === 'conditionFilter' ? '==' : undefined,
        value: type === 'conditionFilter' ? '' : undefined,
        message: type === 'slackAction' ? '' : undefined,
        to: type === 'emailAction' ? '' : undefined,
        subject: type === 'emailAction' ? '' : undefined,
        body: type === 'emailAction' ? '' : undefined,
      },
      sourcePosition: Position.Right,
      targetPosition: Position.Left,
    };

    addNode(newNode);
  }, [reactFlowInstance, addNode]);

  return (
    <ReactFlow
      ref={reactFlowRef}
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onDragOver={onDragOver}
      onDrop={onDrop}
      fitView
      nodeTypes={nodeTypes}
      style={{ width: '100%', height: '100%' }}
    >
      <Background />
      <Controls />
    </ReactFlow>
  );
}

function Flow() {
  const handleDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <ReactFlowProvider>
      <div className="min-h-screen min-w-screen bg-[#0B0F19] flex">
      <div className="w-72 bg-[#07101b]/40 backdrop-blur-md border-r border-slate-800 p-6 space-y-4 overflow-y-auto">
        <div className="text-white font-bold text-lg">Nodes</div>
        <p className="text-xs text-slate-400">Drag nodes onto the canvas to build your workflow.</p>
        
        <div className="space-y-2">
          {nodePalette.map(({ type, label, icon, color }) => (
            <div
              key={type}
              draggable
              onDragStart={(e) => handleDragStart(e, type)}
              className="p-3 rounded-lg bg-[#131B2E]/60 border border-white/10 hover:border-white/30 hover:bg-[#131B2E]/80 cursor-grab active:cursor-grabbing transition-all select-none"
              style={{ borderLeftColor: color, borderLeftWidth: '3px' }}
            >
              <div className="text-lg mb-1">{icon}</div>
              <div className="text-sm font-medium text-white">{label}</div>
              <div className="text-xs text-slate-400 mt-1">Drag to canvas</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex-1 h-screen relative">
        <FlowCanvas />
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <button 
            onClick={async () => {
              const token = localStorage.getItem('token');
              const state = useStore.getState();
              const id = window.location.pathname.split('/').pop();
              try {
                toast.loading('Saving...', { id: 'save' });
                await axios.post(`http://localhost:4000/api/workflows/save/${id}`, {
                  nodes: state.nodes,
                  edges: state.edges
                }, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Workflow saved!', { id: 'save' });
              } catch (err) {
                toast.error('Save failed', { id: 'save' });
              }
            }}
            className="bg-[#131B2E] border border-white/20 hover:border-cyan-400 text-white px-6 py-2 rounded-full font-semibold transition-all"
          >
            💾 Save Workflow
          </button>

          <button 
            onClick={async () => {
              const token = localStorage.getItem('token');
              const state = useStore.getState();
              try {
                toast.loading('Running workflow...', { id: 'run' });
                await axios.post('http://localhost:4000/api/workflows/test', {
                  nodes: state.nodes,
                  edges: state.edges
                }, {
                  headers: { Authorization: `Bearer ${token}` }
                });
                toast.success('Test execution successful!', { id: 'run' });
              } catch (err) {
                toast.error(err.response?.data?.message || 'Execution failed', { id: 'run' });
              }
            }}
            className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-2 rounded-full font-bold shadow-[0_0_15px_rgba(6,182,212,0.5)] transition-all"
          >
            ▶ Run Test
          </button>
        </div>
      </div>
      </div>
    </ReactFlowProvider>
  );
}

export default Flow;
