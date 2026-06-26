const Invoice = require('../models/invoice');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getAll = async (req, res) => {
  const items = await Invoice.find({});
  sendSuccess(res, items);
};

const getOne = async (req, res) => {
  const item = await Invoice.findById(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};

const create = async (req, res) => {
  const item = await Invoice.create(req.body);
  sendSuccess(res, item, 'Created', 201);
};

module.exports = { getAll, getOne, create };