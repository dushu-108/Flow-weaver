import { Schema, model } from 'mongoose';

const MetricCacheSchema = new Schema({
  workflowId: { type: Schema.Types.ObjectId, ref: 'Workflow', required: true, unique: true },
  totalRuns: { type: Number, default: 0 },
  successfulRuns: { type: Number, default: 0 },
  failedRuns: { type: Number, default: 0 },
  rollingExecutionTimeSum: { type: Number, default: 0 }
}, { timestamps: true });

export default model('MetricCache', MetricCacheSchema);