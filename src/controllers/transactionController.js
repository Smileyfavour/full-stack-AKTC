const Transaction = require('../models/transaction');
const { sendSuccess, sendError } = require('../utils/responseHandler');
const applyRoleFilter = require('../utils/roleFilter');

const getAll = async (req, res) => {
  const query = applyRoleFilter(req.user, "transaction");

  const items = await Transaction.find(query)
  sendSuccess(res, items);
};

const getOne = async (req, res) => {
  const item = await Transaction.findById(req.params.id);
  if (!item) return sendError(res, 'Not found', 404);
  sendSuccess(res, item);
};

const create = async (req, res) => {
  const item = await Transaction.create(req.body);
  sendSuccess(res, item, 'Created', 201);
};

module.exports = { getAll, getOne, create };