const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    date: { type: Date, required: true },
    location: { type: String },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    type: { type: String, enum: ['academic', 'cultural', 'workshop', 'other'] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Event', eventSchema);