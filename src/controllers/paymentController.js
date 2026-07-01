const Payment = require('../models/payment');
const paymentService = require('../services/paymentService');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const applyRoleFilter = require('../utils/roleFilter');


const getAll = async (req, res) => {
  const query = applyRoleFilter(req.user, "payments");

  const items = await Payment.find(query);

  sendSuccess(res, items);
};
const getOne = async (req, res) => {
  const item = await Payment.findById(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};

// 🔥 IMPORTANT CHANGE HERE
const create = async (req, res) => {
  try {
    const item = await paymentService.createPayment(req.body);

    sendSuccess(res, item, 'Created successfully', 201);
  } catch (err) {
    sendError(res, err.message, 400);
  }
};

const update = async (req, res) => {
  const item = await Payment.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item, 'Updated successfully');
};

const remove = async (req, res) => {
  const item = await Payment.findByIdAndDelete(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, null, 'Deleted', 204);
};

module.exports = { getAll, getOne, create, update, remove };