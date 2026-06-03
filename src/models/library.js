const mongoose = require('mongoose');

const librarySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    fileUrl: { type: String, required: true },
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course' },
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['notes', 'video', 'assignment', 'other'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('ELibrary', librarySchema);