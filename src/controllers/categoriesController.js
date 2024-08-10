const CategoryModel = require('../models/categoryModel');
const categoryModel = new CategoryModel();
const { validationResult } = require('express-validator');

// Create a new category
const createCategory = async (req, res, next) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { category_name, description } = req.body;
    try {
        const category = await categoryModel.createCategory(category_name, description);
        res.status(201).json({ success: true, message: "Category created successfully", category });
    } catch (error) {
        next(error);
    }
};

// Get all categories
const getAllCategories = async (req, res, next) => {
    try {
        const categories = await categoryModel.findAllCategories();
        res.status(200).json(categories);
    } catch (error) {
        next(error);
    }
};

// Get category by ID
const getCategoryById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const category = await categoryModel.findCategoryById(id);
        if (category) {
            res.status(200).json(category);
        } else {
            res.status(404).json({ success: false, message: "Category not found" });
        }
    } catch (error) {
        next(error);
    }
};

// Update category by ID
const updateCategoryById = async (req, res, next) => {
    // Validate Request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { id } = req.params;
    const { category_name, description } = req.body;
    try {
        const updatedCategory = await categoryModel.updateCategoryById(id, category_name, description);
        if (updatedCategory) {
            res.status(200).json({ success: true, message: "Category updated successfully", updatedCategory });
        } else {
            res.status(404).json({ success: false, message: "Category not found" });
        }
    } catch (error) {
        next(error);
    }
};

// Delete category by ID
const deleteCategoryById = async (req, res, next) => {
    const { id } = req.params;
    try {
        await categoryModel.deleteCategoryById(id);
        res.status(200).json({ success: true, message: "Category deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};
