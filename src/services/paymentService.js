const processPayment = async (paymentDetails) => {
  // Integrate with Paystack, Flutterwave, etc.
  // For now, return success simulation
  return { success: true, transactionId: `TXN_${Date.now()}` };
};

module.exports = { processPayment };