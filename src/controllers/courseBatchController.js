const CourseBatch = require('../models/courseBatch');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const applyRoleFilter = require('../utils/roleFilter');

const getAll = async (req, res) => {
  const query = applyRoleFilter(req.user, "courseBatches");

  const items = await CourseBatch.find(query)
    .populate("course");

  sendSuccess(res, items);
};

const getOne = async (req, res) => {
  const item = await CourseBatch.findById(req.params.id)
  .populate("course"); // 🔥 add this

  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};

const create = async (req, res) => {
  const item = await CourseBatch.create(req.body);
  sendSuccess(res, item, 'Created successfully', 201);
};

const update = async (req, res) => {
  const item = await CourseBatch.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item, 'Updated successfully');
};

const remove = async (req, res) => {
  const item = await CourseBatch.findByIdAndDelete(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, null, 'Deleted', 204);
};

module.exports = { getAll, getOne, create, update, remove };