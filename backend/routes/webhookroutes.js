import express from 'express';
const router = express.Router();
import webhookController from '../controllers/webhookcontroller.js';
const { handleIncomingWebhook, getWorkflowAnalyticsSummary, getWorkflowHistoryList } = webhookController;

router.post('/run/:id', handleIncomingWebhook);
router.get('/summary/:id', getWorkflowAnalyticsSummary);
router.get('/history/:id', getWorkflowHistoryList);

export default router;
