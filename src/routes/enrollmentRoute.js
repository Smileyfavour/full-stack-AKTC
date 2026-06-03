const express = require('express');
const { getAll, getOne, create, update, remove } = require('../controllers/entrollmentController');
const { protect, authorize } = require('../middlewares/authMiddleware');

const router = express.Router();
router.use(protect);
router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', authorize('admin', 'instructor'), create);
router.put('/:id', authorize('admin', 'instructor'), update);
router.delete('/:id', authorize('admin'), remove);

module.exports = router;