const express = require('express');
const { body, param } = require('express-validator');
const router = express.Router();
const productController = require('../controllers/productController');
const adminController = require('../controllers/adminController');


// POST /products - Create a new product
router.post('/',
    adminController.authenticateToken,

    body('category_id').isInt().withMessage('Category ID must be an integer.'),
    body('product_name').notEmpty().withMessage('Product name is required.'),
    body('price').isDecimal({ decimal_digits: '2' }).withMessage('Price must be a decimal number with 2 decimal places.'),
    body('description').optional().isString().withMessage('Description must be a string.'),
    body('inventory').optional().isInt().withMessage('Inventory must be an integer.'),
    productController.createProduct
);

// GET /products - Get all products
router.get('/',
    productController.getAllProducts
);

// GET /products/:id - Get a product by ID
router.get('/:id',
    param('id').isInt().withMessage('ID must be an integer.'),
    productController.getProductById
);

// PUT /products/:id - Update a product by ID
router.put('/:id',
    adminController.authenticateToken,

    param('id').isInt().withMessage('ID must be an integer.'),
    body('category_id').optional().isInt().withMessage('Category ID must be an integer.'),
    body('product_name').optional().notEmpty().withMessage('Product name cannot be empty.'),
    body('price').optional().isDecimal({ decimal_digits: '2' }).withMessage('Price must be a decimal number with 2 decimal places.'),
    body('description').optional().isString().withMessage('Description must be a string.'),
    body('inventory').optional().isInt().withMessage('Inventory must be an integer.'),
    productController.updateProductById
);

// DELETE /products/:id - Delete a product by ID
router.delete('/:id',
    adminController.authenticateToken,

    param('id').isInt().withMessage('ID must be an integer.'),
    productController.deleteProductById
);

module.exports = router;
