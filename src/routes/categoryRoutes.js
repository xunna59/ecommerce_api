const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const adminController = require('../controllers/adminController');


// POST /categories - Create a new category
router.post('/',
    adminController.authenticateToken,
    body('category_name').notEmpty().withMessage('Category name is required.'),
    body('description').optional().isString().withMessage('Description must be a string.'),
    categoryController.createCategory
);

// GET /categories - Get all categories
router.get('/',
    categoryController.getAllCategories
);

// GET /categories/:id - Get a category by ID
router.get('/:id',
    param('id').isInt().withMessage('ID must be an integer.'),
    categoryController.getCategoryById
);

// PUT /categories/:id - Update a category by ID
router.put('/:id',
    adminController.authenticateToken,
    param('id').isInt().withMessage('ID must be an integer.'),
    body('category_name').optional().notEmpty().withMessage('Category name cannot be empty.'),
    body('description').optional().isString().withMessage('Description must be a string.'),
    categoryController.updateCategoryById
);

// DELETE /categories/:id - Delete a category by ID
router.delete('/:id',
    adminController.authenticateToken,

    param('id').isInt().withMessage('ID must be an integer.'),
    categoryController.deleteCategoryById
);

module.exports = router;
