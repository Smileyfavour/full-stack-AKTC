const Class = require('../models/class');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const applyRoleFilter = require('../utils/roleFilter');

const getAll = async (req, res) => {
  const query = applyRoleFilter(req.user, "class");
  const items = await Class.find(query);
  sendSuccess(res, items);
};

const getOne = async (req, res) => {
  const item = await Class.findById(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};

const create = async (req, res) => {
  const item = await Class.create(req.body);
  sendSuccess(res, item, 'Created successfully', 201);
};

const update = async (req, res) => {
  const item = await Class.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item, 'Updated successfully');
};

const remove = async (req, res) => {
  const item = await Class.findByIdAndDelete(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, null, 'Deleted', 204);
};

module.exports = { getAll, getOne, create, update, remove };