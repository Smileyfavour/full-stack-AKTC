const Support = require('../models/supportTicket');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getAll = async (req, res) => {
  const items = await Support.find({});
  sendSuccess(res, items);
};

const getOne = async (req, res) => {
  const item = await Support.findById(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};

const create = async (req, res) => {
  const item = await Support.create(req.body);
  sendSuccess(res, item, 'Created successfully', 201);
};

const update = async (req, res) => {
  const item = await Support.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item, 'Updated successfully');
};

const remove = async (req, res) => {
  const item = await Support.findByIdAndDelete(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, null, 'Deleted', 204);
};

module.exports = { getAll, getOne, create, update, remove };