const mongoose = require('mongoose');

const invoiceReceiptSchema = new mongooseSchema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        payment: { type: mongoose.Schema.Types.ObjectId, ref: 'payment', required: true },
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