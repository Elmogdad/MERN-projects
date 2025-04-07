const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    dueDate: { type: Date, required: true },
    status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
    assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    attachments: [{ type: String }], // Array of URLs or file paths for attachments
    todoChecklist: [{ type: String }], // Array of strings for checklist items
    progress: { type: Number, default: 0 }, // Percentage of task completion
}, {
    timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
