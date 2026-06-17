const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware');
const { body } = require('express-validator');
const validate = require('../middlewares/validateMiddleware');


// Define the router for authentication routes
const router = express.Router();

// Route for user registration with validation

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Valid email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
  ],
  validate,
  register
);

// Route for user login with validation
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, login);
router.get('/profile', protect, getProfile);

module.exports = router;