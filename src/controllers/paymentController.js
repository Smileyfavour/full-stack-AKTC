const Payment = require('../models/payment');
const { sendSuccess, sendError } = require('../utils/responseHandler');

// CRUD operations for Payment
const getAll = async (req, res) => {
  const items = await Payment.find({});
  sendSuccess(res, items);
};

// Get a single payment by ID
const getOne = async (req, res) => {
  const item = await Payment.findById(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};

// Create a payment

const create = async (req, res) => {
  const item = await Payment.create(req.body);
  sendSuccess(res, item, 'Created successfully', 201);
};

// Update a payment (e.g., update status)
const update = async (req, res) => {
  const item = await Payment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item, 'Updated successfully');
};

// Delete a payment
const remove = async (req, res) => {
  const item = await Payment.findByIdAndDelete(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, null, 'Deleted', 204);
};

module.exports = { getAll, getOne, create, update, remove };