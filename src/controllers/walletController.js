const Wallet = require('../models/wallet');
const { sendSuccess, sendError } = require('../utils/responseHandler');


// CRUD operations for Wallet
const getAll = async (req, res) => {
  const items = await Wallet.find({});
  sendSuccess(res, items);
};

// Get a single wallet by ID
const getOne = async (req, res) => {
  const item = await Wallet.findById(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};


// Create a wallet
const create = async (req, res) => {
  const item = await Wallet.create(req.body);
  sendSuccess(res, item, 'Created successfully', 201);
};

// Update a wallet (e.g., debit or credit)

const update = async (req, res) => {
  const item = await Wallet.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item, 'Updated successfully');
};

// Delete a wallet
const remove = async (req, res) => {
  const item = await Wallet.findByIdAndDelete(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, null, 'Deleted', 204);
};

module.exports = { getAll, getOne, create, update, remove };