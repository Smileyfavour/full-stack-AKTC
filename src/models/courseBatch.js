const mongoose = require('mongoose');

const courseBatchSchema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: 'Course', required: true },
    batchCode: { type: String, required: true, unique: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    schedule: { type: String }, // e.g., "Mon/Wed 2pm-4pm"
    capacity: { type: Number, default: 20 },
    instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CourseBatch', courseBatchSchema);