import { Schema, model } from 'mongoose';

const WorkflowSchema = new Schema({
  name: { type: String, required: true, trim: true, default: 'Untitled Workflow' },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  isActive: { type: Boolean, default: false },
  nodes: { type: Array, default: [] },
  edges: { type: Array, default: [] }
}, { timestamps: true });

export default model('Workflow', WorkflowSchema);