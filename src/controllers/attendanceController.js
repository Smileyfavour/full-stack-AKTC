const Attendance = require('../models/classAttendance');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getAll = async (req, res) => {
  const items = await Attendance.find({});
  sendSuccess(res, items);
};

const getOne = async (req, res) => {
  const item = await Attendance.findById(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};

const create = async (req, res) => {
  const item = await Attendance.create(req.body);
  sendSuccess(res, item, 'Created successfully', 201);
};

const update = async (req, res) => {
  const item = await Attendance.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item, 'Updated successfully');
};

const remove = async (req, res) => {
  const item = await Attendance.findByIdAndDelete(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, null, 'Deleted', 204);
};

module.exports = { getAll, getOne, create, update, remove };