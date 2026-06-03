const { registerUser, loginUser } = require('../services/authService');
const { sendSuccess, sendError } = require('../utils/responseHandler');

const register = async (req, res) => {
  try {
    const { user, token } = await registerUser(req.body);
    sendSuccess(res, { user, token }, 'Registration successful', 201);
  } catch (error) {
    sendError(res, error.message, 400);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const { user, token } = await loginUser(email, password);
    sendSuccess(res, { user, token }, 'Login successful');
  } catch (error) {
    sendError(res, error.message, 401);
  }
};

const getProfile = async (req, res) => {
  sendSuccess(res, req.user, 'Profile fetched');
};

module.exports = { register, login, getProfile };