const CenterInfo = require('../models/centerInfo');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getAll = async (req, res) => {
  const items = await CenterInfo.find({});
  sendSuccess(res, items);
};

const getOne = async (req, res) => {
  const item = await CenterInfo.findById(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};

const create = async (req, res) => {
  const item = await CenterInfo.create(req.body);
  sendSuccess(res, item, 'Created successfully', 201);
};

const update = async (req, res) => {
  const item = await CenterInfo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item, 'Updated successfully');
};

const remove = async (req, res) => {
  const item = await CenterInfo.findByIdAndDelete(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, null, 'Deleted', 204);
};

module.exports = { getAll, getOne, create, update, remove };