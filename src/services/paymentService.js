const Payment = require('../models/payment');
const Wallet = require('../models/wallet');

// PROCESS PAYMENT (mock or gateway logic)
const processPayment = async (paymentDetails) => {
  return {
    success: true,
    transactionId: `TXN_${Date.now()}`
  };
};

// CREATE PAYMENT + UPDATE WALLET (MAIN LOGIC)
const createPayment = async (data) => {
  // 1. Create payment
  const payment = await Payment.create(data);

  // 2. Find wallet
  const wallet = await Wallet.findById(data.walletId);

  if (!wallet) {
    throw new Error("Wallet not found");
  }

  // 3. Update wallet balance
  wallet.balance = wallet.balance - data.amount; 
  // (or + if it's funding wallet)

  await wallet.save();

  return payment;
};

const verifyGatewayPayment = async (reference) => {
  return { success: true, reference };
};

const processRefund = async (transactionId) => {
  return { success: true, transactionId };
};

module.exports = {
  processPayment,
  verifyGatewayPayment,
  processRefund,
  createPayment
};