const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const adminController = require('../controllers/adminController');


// POST /users - Create a new user
router.post('/register',
    body('username').notEmpty().withMessage('Username is required.'),
    body('email').isEmail().withMessage('Email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),


    adminController.register
);

router.post('/login',
    body('email').isEmail().withMessage('Email is required.'),
    body('password').notEmpty().withMessage('Password is required.'),
    adminController.login
);

router.get('/profile',
    adminController.authenticateToken,
    adminController.getProfile
);



module.exports = router;