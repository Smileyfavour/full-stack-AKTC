const mongoose = require('mongoose');

const invoiceReceiptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    payment: { type: mongoose.Schema.Types.ObjectId, ref: 'Payment', required: true },
    invoiceNumber: { type: String, required: true, unique: true },
    date: { type: Date, default: Date.now },

    items: [
      {
        description: String,
        amount: Number,
      },
    ],

    totalAmount: Number,
    pdfUrl: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('InvoiceReceipt', invoiceReceiptSchema);