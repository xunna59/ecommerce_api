const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const adminController = require('../controllers/adminController');


// POST /payments - Create a new payment
router.post('/',
    adminController.authenticateToken,
    body('order_id').isInt().withMessage('Order ID must be an integer.'),
    body('amount').isDecimal({ decimal_digits: '2' }).withMessage('Amount must be a decimal number with 2 decimal places.'),
    body('payment_method').notEmpty().withMessage('Payment method is required.'),
    body('status').optional().isString().withMessage('Status must be a string.'),
    body('transaction_id').optional().isString().withMessage('Transaction ID must be a string.'),
    body('details').optional().isJSON().withMessage('Details must be a valid JSON object.'),
    paymentController.createPayment
);

// GET /payments - Get all payments
router.get('/',
    adminController.authenticateToken,
    paymentController.getAllPayments
);

// GET /payments/:id - Get a payment by ID
router.get('/:id',
    adminController.authenticateToken,
    param('id').isInt().withMessage('ID must be an integer.'),
    paymentController.getPaymentById
);

// PUT /payments/:id - Update a payment by ID
router.put('/:id',
    adminController.authenticateToken,
    param('id').isInt().withMessage('ID must be an integer.'),
    body('order_id').optional().isInt().withMessage('Order ID must be an integer.'),
    body('amount').optional().isDecimal({ decimal_digits: '2' }).withMessage('Amount must be a decimal number with 2 decimal places.'),
    body('payment_method').optional().isString().withMessage('Payment method must be a string.'),
    body('status').optional().isString().withMessage('Status must be a string.'),
    body('transaction_id').optional().isString().withMessage('Transaction ID must be a string.'),
    body('details').optional().isJSON().withMessage('Details must be a valid JSON object.'),
    paymentController.updatePaymentById
);

// DELETE /payments/:id - Delete a payment by ID
router.delete('/:id',
    adminController.authenticateToken,
    param('id').isInt().withMessage('ID must be an integer.'),
    paymentController.deletePaymentById
);

module.exports = router;
