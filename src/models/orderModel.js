const pool = require('../config/db_config');

class OrderModel {
    // Create an order
    async createOrder(user_id, total_amount, shipping_address, billing_address, payment_id) {
        try {
            const result = await pool.query(
                'INSERT INTO orders (user_id, total_amount, shipping_address, billing_address, payment_id) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [user_id, total_amount, shipping_address, billing_address, payment_id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find an order by ID
    async findOrderById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM orders WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find all orders
    async findAllOrders() {
        try {
            const result = await pool.query(
                'SELECT * FROM orders'
            );
            return result.rows;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find orders by user ID
    async findOrdersByUserId(user_id) {
        try {
            const result = await pool.query(
                'SELECT * FROM orders WHERE user_id = $1',
                [user_id]
            );
            return result.rows;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Update an order by ID
    async updateOrderById(id, status, total_amount, shipping_address, billing_address, payment_id) {
        try {
            const result = await pool.query(
                'UPDATE orders SET status = $1, total_amount = $2, shipping_address = $3, billing_address = $4, payment_id = $5, order_date = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
                [status, total_amount, shipping_address, billing_address, payment_id, id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Delete an order by ID
    async deleteOrderById(id) {
        try {
            await pool.query(
                'DELETE FROM orders WHERE id = $1',
                [id]
            );
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
}

module.exports = OrderModel;
