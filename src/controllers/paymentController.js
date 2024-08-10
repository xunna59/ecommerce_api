const PaymentModel = require('../models/paymentModel');
const paymentModel = new PaymentModel();
const { validationResult } = require('express-validator');

// Create a new payment
const createPayment = async (req, res, next) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { order_id, amount, payment_method, status, transaction_id, details } = req.body;
    try {
        const payment = await paymentModel.createPayment(order_id, amount, payment_method, status, transaction_id, details);
        res.status(201).json({ success: true, message: "Payment created successfully", payment });
    } catch (error) {
        next(error);
    }
};

// Get all payments
const getAllPayments = async (req, res, next) => {
    try {
        const payments = await paymentModel.findAllPayments();
        res.status(200).json(payments);
    } catch (error) {
        next(error);
    }
};

// Get a payment by ID
const getPaymentById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const payment = await paymentModel.findPaymentById(id);
        if (payment) {
            res.status(200).json(payment);
        } else {
            res.status(404).json({ success: false, message: "Payment not found" });
        }
    } catch (error) {
        next(error);
    }
};

// Update a payment by ID
const updatePaymentById = async (req, res, next) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { id } = req.params;
    const { order_id, amount, payment_method, status, transaction_id, details } = req.body;
    try {
        const updatedPayment = await paymentModel.updatePaymentById(id, order_id, amount, payment_method, status, transaction_id, details);
        if (updatedPayment) {
            res.status(200).json({ success: true, message: "Payment updated successfully", updatedPayment });
        } else {
            res.status(404).json({ success: false, message: "Payment not found" });
        }
    } catch (error) {
        next(error);
    }
};

// Delete a payment by ID
const deletePaymentById = async (req, res, next) => {
    const { id } = req.params;
    try {
        await paymentModel.deletePaymentById(id);
        res.status(200).json({ success: true, message: "Payment deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createPayment,
    getAllPayments,
    getPaymentById,
    updatePaymentById,
    deletePaymentById
};
