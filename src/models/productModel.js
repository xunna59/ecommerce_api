const pool = require('../config/db_config');

class ProductModel {
    // Create a product
    async createProduct(category_id, product_name, price, description, inventory) {
        try {
            const result = await pool.query(
                'INSERT INTO products (category_id, product_name, price, description, inventory) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [category_id, product_name, price, description, inventory]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find a product by ID
    async findProductById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM products WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find all products
    async findAllProducts() {
        try {
            const result = await pool.query(
                'SELECT * FROM products'
            );
            return result.rows;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find products by category ID
    async findProductsByCategoryId(category_id) {
        try {
            const result = await pool.query(
                'SELECT * FROM products WHERE category_id = $1',
                [category_id]
            );
            return result.rows;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Update a product by ID
    async updateProductById(id, category_id, product_name, price, description, inventory) {
        try {
            const result = await pool.query(
                'UPDATE products SET category_id = $1, product_name = $2, price = $3, description = $4, inventory = $5, date_created = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
                [category_id, product_name, price, description, inventory, id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Delete a product by ID
    async deleteProductById(id) {
        try {
            await pool.query(
                'DELETE FROM products WHERE id = $1',
                [id]
            );
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
}

module.exports = ProductModel;
