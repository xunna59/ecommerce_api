const pool = require('../config/db_config');

class CategoryModel {
    // Create a category
    async createCategory(category_name, description) {
        try {
            const result = await pool.query(
                'INSERT INTO categories (category_name, description) VALUES ($1, $2) RETURNING *',
                [category_name, description]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find a category by ID
    async findCategoryById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM categories WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find all categories
    async findAllCategories() {
        try {
            const result = await pool.query(
                'SELECT * FROM categories'
            );
            return result.rows;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Update a category by ID
    async updateCategoryById(id, category_name, description) {
        try {
            const result = await pool.query(
                'UPDATE categories SET category_name = $1, description = $2, date_created = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
                [category_name, description, id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Delete a category by ID
    async deleteCategoryById(id) {
        try {
            await pool.query(
                'DELETE FROM categories WHERE id = $1',
                [id]
            );
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
}

module.exports = CategoryModel;
