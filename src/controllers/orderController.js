const OrderModel = require('../models/orderModel');
const orderModel = new OrderModel();
const { validationResult } = require('express-validator');

// Create a new order
const createOrder = async (req, res, next) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { user_id, status, total_amount, shipping_address, billing_address, payment_id } = req.body;
    try {
        const order = await orderModel.createOrder(user_id, status, total_amount, shipping_address, billing_address, payment_id);
        res.status(201).json({ success: true, message: "Order created successfully", order });
    } catch (error) {
        next(error);
    }
};

// Get all orders
const getAllOrders = async (req, res, next) => {
    try {
        const orders = await orderModel.findAllOrders();
        res.status(200).json(orders);
    } catch (error) {
        next(error);
    }
};

// Get an order by ID
const getOrderById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const order = await orderModel.findOrderById(id);
        if (order) {
            res.status(200).json(order);
        } else {
            res.status(404).json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        next(error);
    }
};

// Update an order by ID
const updateOrderById = async (req, res, next) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { id } = req.params;
    const { user_id, status, total_amount, shipping_address, billing_address, payment_id } = req.body;
    try {
        const updatedOrder = await orderModel.updateOrderById(id, user_id, status, total_amount, shipping_address, billing_address, payment_id);
        if (updatedOrder) {
            res.status(200).json({ success: true, message: "Order updated successfully", updatedOrder });
        } else {
            res.status(404).json({ success: false, message: "Order not found" });
        }
    } catch (error) {
        next(error);
    }
};

// Delete an order by ID
const deleteOrderById = async (req, res, next) => {
    const { id } = req.params;
    try {
        await orderModel.deleteOrderById(id);
        res.status(200).json({ success: true, message: "Order deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    getAllOrders,
    getOrderById,
    updateOrderById,
    deleteOrderById
};
