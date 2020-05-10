import CWM from 'graphql-compose-mongoose';
const { composeWithMongoose } = CWM;
import timestamps from 'mongoose-timestamp';
import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
    title: { type: String, trim: true, required: true },
    isChecked: { type: Boolean, trim: true, required: true },
    userID: { type: String, required: true }
});

TaskSchema.plugin(timestamps);

TaskSchema.index({ createdAt: 1, updatedAt: 1 });

const Task = mongoose.model('Task', TaskSchema);

const customOptions = {};
const TaskTC = composeWithMongoose(Task, customOptions);

export { Task, TaskTC };