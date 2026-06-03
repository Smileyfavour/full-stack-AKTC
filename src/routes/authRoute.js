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
    body('name').notEmpty(),
    body('phone').notEmpty(),
    body('email').isEmail(),
    body('password').isLength({ min: 6 }),
  ],
  validate,
  register
);

// Route for user login with validation
router.post('/login', [body('email').isEmail(), body('password').notEmpty()], validate, login);
router.get('/profile', protect, getProfile);

module.exports = router;