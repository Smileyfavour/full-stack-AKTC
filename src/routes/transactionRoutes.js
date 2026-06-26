const express = require('express');
const router = express.Router();

const {
  getAll,
  getOne,
  create
} = require('../controllers/transactionController');

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);

module.exports = router;