const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const orderController = require('../controllers/orderController');
const authController = require('../controllers/authController');
const adminController = require('../controllers/adminController');



// POST /orders - Create a new order
router.post('/',
    authController.authenticateToken,
    body('user_id').optional().isInt().withMessage('User ID must be an integer.'),
    body('total_amount').isDecimal({ decimal_digits: '2' }).withMessage('Total amount must be a decimal number with 2 decimal places.'),
    body('status').optional().isString().withMessage('Status must be a string.'),
    body('shipping_address').optional().isString().withMessage('Shipping address must be a string.'),
    body('billing_address').optional().isString().withMessage('Billing address must be a string.'),
    body('payment_id').optional().isInt().withMessage('Payment ID must be an integer.'),
    orderController.createOrder
);

// GET /orders - Get all orders
router.get('/',
    adminController.authenticateToken,
    orderController.getAllOrders
);

// GET /orders/:id - Get an order by ID
router.get('/:id',
    authController.authenticateToken,
    param('id').isInt().withMessage('ID must be an integer.'),
    orderController.getOrderById
);

// PUT /orders/:id - Update an order by ID
router.put('/:id',
    adminController.authenticateToken,
    param('id').isInt().withMessage('ID must be an integer.'),
    body('user_id').optional().isInt().withMessage('User ID must be an integer.'),
    body('total_amount').optional().isDecimal({ decimal_digits: '2' }).withMessage('Total amount must be a decimal number with 2 decimal places.'),
    body('status').optional().isString().withMessage('Status must be a string.'),
    body('shipping_address').optional().isString().withMessage('Shipping address must be a string.'),
    body('billing_address').optional().isString().withMessage('Billing address must be a string.'),
    body('payment_id').optional().isInt().withMessage('Payment ID must be an integer.'),
    orderController.updateOrderById
);

// DELETE /orders/:id - Delete an order by ID
router.delete('/:id',
    adminController.authenticateToken,
    param('id').isInt().withMessage('ID must be an integer.'),
    orderController.deleteOrderById
);

module.exports = router;
