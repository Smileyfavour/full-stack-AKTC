const CoursePayment = require("../models/coursePayment");
const Course = require("../models/course");

// Create a new course payment
exports.createPayment = async (req, res) => {
  try {
    const { courseId, amount, paymentMethod } = req.body;

    const payment = await CoursePayment.create({
      userId: req.user.id,
      courseId,
      amount,
      paymentMethod,
      transactionId: `AKTC-${Date.now()}`,
    });

    res.status(201).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get all payments for the logged-in user
exports.getMyPayments = async (req, res) => {
  try {
    const payments = await CoursePayment.find({
      userId: req.user.id,
    })
      .populate("courseId")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get a single payment
exports.getPaymentById = async (req, res) => {
  try {
    const payment = await CoursePayment.findById(
      req.params.id
    )
      .populate("userId")
      .populate("courseId");

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Verify payment (admin only)
exports.verifyPayment = async (req, res) => {
  try {
    const payment = await CoursePayment.findById(
      req.params.id
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    payment.status = "Paid";
    payment.paidAt = new Date();

    await payment.save();

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// refund payment
exports.refundPayment = async (req, res) => {
  try {
    const payment = await CoursePayment.findById(
      req.params.id
    );

    if (!payment) {
      return res.status(404).json({
        message: "Payment not found",
      });
    }

    payment.status = "Refunded";
    payment.refundedAt = new Date();
    payment.refundReason = req.body.reason;

    await payment.save();

    res.status(200).json({
      success: true,
      message: "Refund completed",
      payment,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Admin: Get all payments
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await CoursePayment.find()
      .populate("userId")
      .populate("courseId")
      .sort({ createdAt: -1 });

    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};