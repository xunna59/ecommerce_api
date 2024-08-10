const ProductModel = require('../models/productModel');
const productModel = new ProductModel();
const { validationResult } = require('express-validator');

// Create a new product
const createProduct = async (req, res, next) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { category_id, product_name, price, description, inventory } = req.body;
    try {
        const product = await productModel.createProduct(category_id, product_name, price, description, inventory);
        res.status(201).json({ success: true, message: "Product created successfully", product });
    } catch (error) {
        next(error);
    }
};

// Get all products
const getAllProducts = async (req, res, next) => {
    try {
        const products = await productModel.findAllProducts();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
};

// Get a product by ID
const getProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const product = await productModel.findProductById(id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        next(error);
    }
};

// Update a product by ID
const updateProductById = async (req, res, next) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { id } = req.params;
    const { category_id, product_name, price, description, inventory } = req.body;
    try {
        const updatedProduct = await productModel.updateProductById(id, category_id, product_name, price, description, inventory);
        if (updatedProduct) {
            res.status(200).json({ success: true, message: "Product updated successfully", updatedProduct });
        } else {
            res.status(404).json({ success: false, message: "Product not found" });
        }
    } catch (error) {
        next(error);
    }
};

// Delete a product by ID
const deleteProductById = async (req, res, next) => {
    const { id } = req.params;
    try {
        await productModel.deleteProductById(id);
        res.status(200).json({ success: true, message: "Product deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProductById,
    deleteProductById
};
