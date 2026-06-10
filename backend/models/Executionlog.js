import { Schema, model } from 'mongoose';

const ExecutionLogSchema = new Schema({
  workflowId: { type: Schema.Types.ObjectId, ref: 'Workflow', required: true },
  status: { type: String, enum: ['SUCCESS', 'FAILED'], required: true },
  incomingPayload: { type: Object, default: {} },
  executionSteps: [
    {
      nodeId: { type: String, required: true },
      nodeType: { type: String, required: true },
      status: { type: String, enum: ['SUCCESS', 'FAILED'], required: true },
      errorDetails: { type: String, default: null },
      executedAt: { type: Date, default: Date.now }
    }
  ],
  totalExecutionTimeMs: { type: Number, default: 0 }
}, { timestamps: true });

export default model('ExecutionLog', ExecutionLogSchema);