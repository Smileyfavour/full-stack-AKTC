const mongoose = require('mongoose');

const gradebookEntrySchema = new mongoose.Schema(
  {
    enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment', required: true },
    assignmentName: { type: String, required: true },
    score: { type: Number, required: true, min: 0 },
    maxScore: { type: Number, required: true, min: 0 },
    type: { type: String, enum: ['quiz', 'assignment', 'exam', 'project'] },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model('GradebookEntry', gradebookEntrySchema);