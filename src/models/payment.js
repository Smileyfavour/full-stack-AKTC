const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        enrollment: { type: mongoose.Schema.Types.ObjectId, ref: 'Enrollment' },
        amount: { type: Number, default: 0 },
        paymentMethod: { type: String, enum: ['card', 'bank', 'wallet', 'cash'], required: true },
        transactionId: { type: String, unique: true },
        status: { type: String, enum: ['pending', 'success', 'failed'], default: 'pending' },
        receiptUrl: { type: String }, // Url to payment receipt
        wallet: { type: mongoose.Schema.Types.ObjectId, ref: 'Wallet' },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Payment', paymentSchema);