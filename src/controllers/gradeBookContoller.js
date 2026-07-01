const GradeBook = require('../models/gradeBookEntry');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const applyRoleFilter = require('../utils/roleFilter');

const getAll = async (req, res) => {
  const query = applyRoleFilter(req.user, "gradeBook");

  const items = await GradeBook.find(query)

  sendSuccess(res, items);
};

const getOne = async (req, res) => {
  const item = await GradeBook.findById(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};

const create = async (req, res) => {
  const item = await GradeBook.create(req.body);
  sendSuccess(res, item, 'Created successfully', 201);
};

const update = async (req, res) => {
  const item = await GradeBook.findByIdAndUpdate(req.params.id, req.body, { returnDocument: 'after' });
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item, 'Updated successfully');
};

const remove = async (req, res) => {
  const item = await GradeBook.findByIdAndDelete(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, null, 'Deleted', 204);
};

module.exports = { getAll, getOne, create, update, remove };