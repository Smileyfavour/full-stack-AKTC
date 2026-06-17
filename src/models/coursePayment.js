const mongoose = require("mongoose");

const coursePaymentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },

    amount: {
      type: Number,
      required: true,
      min: 0,
    },

    paymentMethod: {
      type: String,
      enum: ["Card", "Transfer", "Cash", "Wallet"],
      required: true,
    },

    status: {
      type: String,
      enum: ["Pending", "Paid", "Failed", "Refunded"],
      default: "Pending",
    },

    transactionId: {
      type: String,
      unique: true,
      required: true,
    },

    paymentGatewayRef: {
      type: String,
    },

    paidAt: {
      type: Date,
    },

    refundedAt: {
      type: Date,
    },

    refundReason: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.CoursePayment || mongoose.model("CoursePayment", coursePaymentSchema);