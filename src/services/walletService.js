const Wallet = require('../models/wallet');
const Transaction = require('../models/transaction');

const getWallet = async (userId) => {
  let wallet = await Wallet.findOne({ user: userId });
  if (!wallet) {
    wallet = await Wallet.create({ user: userId, balance: 0 });
  }
  return wallet;
};

const creditWallet = async (userId, amount, description, reference) => {
  const wallet = await getWallet(userId);
  wallet.balance += amount;
  await wallet.save();

  await Transaction.create({
    user: userId,
    type: 'credit',
    amount,
    description,
    reference,
    status: 'completed',
  });
  return wallet;
};

const debitWallet = async (userId, amount, description, reference) => {
  const wallet = await getWallet(userId);
  if (wallet.balance < amount) throw new Error('Insufficient balance');
  wallet.balance -= amount;
  await wallet.save();

  await Transaction.create({
    user: userId,
    type: 'debit',
    amount,
    description,
    reference,
    status: 'completed',
  });
  return wallet;
};

module.exports = { getWallet, creditWallet, debitWallet };