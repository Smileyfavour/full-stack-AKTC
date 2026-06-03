const User = require('../models/user');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const getUsers = async (req, res) => {
  const users = await User.find({}).select('-password');
  sendSuccess(res, users);
};

const getUserById = async (req, res) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) return sendError(res, 'User not found', 404);
  sendSuccess(res, user);
};

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
  if (!user) return sendError(res, 'User not found', 404);
  sendSuccess(res, user, 'User updated');
};

const deleteUser = async (req, res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if (!user) return sendError(res, 'User not found', 404);
  sendSuccess(res, null, 'User deleted', 204);
};

module.exports = { getUsers, getUserById, updateUser, deleteUser };