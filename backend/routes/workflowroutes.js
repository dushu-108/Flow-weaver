import express from 'express';
import mongoose from 'mongoose';
const router = express.Router();
import auth from '../middleware/token.js'; 
import workflowController from '../controllers/workflowcontroller.js';
import webhookController from '../controllers/webhookcontroller.js';
const { createNewWorkflow, getUserWorkflows, getWorkflowById, saveWorkflowCanvas, toggleWorkflowStatus } = workflowController;
const { runInterpreter } = webhookController;

router.use(auth);

router.post('/create', async (req, res) => {
  try {
    const { name } = req.body;
    const workflow = await createNewWorkflow(req.user.id, name);
    res.status(201).json({ success: true, data: workflow });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/user', async (req, res) => {
  try {
    const workflows = await getUserWorkflows(req.user.id);
    res.status(200).json({ success: true, data: workflows });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const workflow = await getWorkflowById(req.params.id, req.user.id);
    res.status(200).json({ success: true, data: workflow });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/save/:id', async (req, res) => {
  try {
    const { nodes, edges } = req.body;
    const data = await saveWorkflowCanvas(req.params.id, req.user.id, nodes, edges);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.patch('/toggle/:id', async (req, res) => {
  try {
    const { isActive } = req.body;
    const data = await toggleWorkflowStatus(req.params.id, req.user.id, isActive);
    res.status(200).json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/test', async (req, res) => {
  try {
    const { nodes, edges, payload } = req.body;
    // Create a mock workflow object in memory to pass to interpreter
    // Must use a valid ObjectId to prevent Mongoose CastErrors when saving ExecutionLog
    const mockWorkflow = { _id: new mongoose.Types.ObjectId(), nodes, edges };
    await runInterpreter(mockWorkflow, payload || {});
    res.status(200).json({ success: true, message: 'Test execution initiated' });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;