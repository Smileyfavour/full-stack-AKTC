const express = require('express');
const { getAll, getOne, create, update, remove } = require('../controllers/courseController');
const { protect, authorize } = require('../middlewares/authMiddleware');

// Define the router for course routes
const router = express.Router();

router.use(protect);

// Public
router.get('/', getAll);
router.get('/:id', getOne);

// Protected
router.post('/', protect, authorize('admin', 'instructor'), create);
router.put('/:id', protect, authorize('admin', 'instructor'), update);
router.delete('/:id', protect, authorize('admin'), remove);

module.exports = router;