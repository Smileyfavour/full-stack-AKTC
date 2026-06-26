const express = require("express");

const {
  createPayment,
  verifyPayment,
  getMyPayments,
  getPaymentById,
  refundPayment,
  getAllPayments,
} = require("../controllers/coursePaymentController.js");

const { protect } = require("../middlewares/authMiddleware");
const { authorize } = require("../middlewares/roleMiddleware");

const router = express.Router();

router.use(protect);
router.post("/", createPayment);
router.get("/my-payments", getMyPayments);
router.get("/:id", getPaymentById);
router.put("/:id/verify", authorize("admin", "management"), verifyPayment);
router.put("/:id/refund", authorize("admin", "management"), refundPayment);
router.get("/", authorize("admin", "management"), getAllPayments);

module.exports = router;
