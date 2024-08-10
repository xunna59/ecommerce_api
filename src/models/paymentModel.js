const pool = require('../config/db_config');

class PaymentModel {
    // Create a payment
    async createPayment(order_id, amount, payment_method, status, transaction_id, details) {
        try {
            const result = await pool.query(
                'INSERT INTO payments (order_id, amount, payment_method, status, transaction_id, details) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [order_id, amount, payment_method, status, transaction_id, details]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find a payment by ID
    async findPaymentById(id) {
        try {
            const result = await pool.query(
                'SELECT * FROM payments WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find all payments
    async findAllPayments() {
        try {
            const result = await pool.query(
                'SELECT * FROM payments'
            );
            return result.rows;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find payments by order ID
    async findPaymentsByOrderId(order_id) {
        try {
            const result = await pool.query(
                'SELECT * FROM payments WHERE order_id = $1',
                [order_id]
            );
            return result.rows;
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Update a payment by ID
    async updatePaymentById(id, amount, payment_method, status, transaction_id, details) {
        try {
            const result = await pool.query(
                'UPDATE payments SET amount = $1, payment_method = $2, status = $3, transaction_id = $4, details = $5, payment_date = CURRENT_TIMESTAMP WHERE id = $6 RETURNING *',
                [amount, payment_method, status, transaction_id, details, id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Delete a payment by ID
    async deletePaymentById(id) {
        try {
            await pool.query(
                'DELETE FROM payments WHERE id = $1',
                [id]
            );
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
}

module.exports = PaymentModel;
