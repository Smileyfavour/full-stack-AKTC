const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    courseBatch: { type: mongoose.Schema.Types.ObjectId, ref: 'CourseBatch', required: true },
    title: { type: String, required: true },
    dateTime: { type: Date, required: true },
    room: { type: String },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    topic: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Class', classSchema);