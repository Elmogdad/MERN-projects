const mongoose = require('mongoose');

const todoItemSchema = new mongoose.Schema({
  text: { type: String, required: true },
  completed: { type: Boolean, default: false }
}, { _id: false });

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  priority: { 
    type: String, 
    enum: ['low', 'medium', 'high'], 
    default: 'medium',
    set: v => v.toLowerCase() // تحويل القيمة إلى حروف صغيرة
  },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'in-progress', 'completed'], default: 'pending' },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // مصفوفة من المستخدمين
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  attachments: [{ type: String }], // مصفوفة من روابط أو مسارات الملفات
  todoChecklist: [todoItemSchema], // مصفوفة من بنود القائمة (كائنات تحتوي على text و completed)
  progress: { type: Number, default: 0 } // نسبة إكمال المهمة (كنسبة مئوية)
}, {
  timestamps: true
});

module.exports = mongoose.model('Task', taskSchema);
