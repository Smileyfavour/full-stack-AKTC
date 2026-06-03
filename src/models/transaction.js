const mongoose = require('mongoose');

const transactionSchema = new mongooseSchema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
        type: { type: String, enum:['credit', 'debit'], required: true },
        amount: { type: Number, default: true },
        description: { type: String },
        reference: { type: String, unique: true },
        status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    },
    { timestamp: true }
);


module.exports = mongoose.model('Transaction', transactionSchema);