const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const authController = require('../controllers/authController');


// POST /users - Create a new user
router.post('/register',
    body('username').notEmpty().withMessage('Username is required.'),
    body('firstname').notEmpty().withMessage('First Name is required.'),
    body('lastname').notEmpty().withMessage('Last Name is required.'),
    body('email').isEmail().withMessage('Email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    body('gender').notEmpty().withMessage('Gender is required.'),

    authController.register
);

router.post('/login',
    body('email').isEmail().withMessage('Email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    authController.login
);

router.get('/profile',
    authController.authenticateToken,
    authController.getProfile
);



module.exports = router;