const pool = require('../config/db_config');

class AdminModel {
    // Create a admin Function
    async createAdmin(username, email, password, role) {
        try {
            const result = await pool.query(
                'INSERT INTO admin (username, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
                [username, email, password, role]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    // Find a admin by emailFunction
    async findAdminByEmail(email) {
        try {
            const result = await pool.query(
                'SELECT * FROM admin WHERE email = $1',
                [email]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    async findById(id) {
        try {
            const result = await pool.query(
                'SELECT id, username, email, role, date_created FROM admin WHERE id = $1',
                [id]
            );
            return result.rows[0];
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }

    //

    async deleteAdminByEmail(email) {
        try {
            await pool.query('DELETE FROM admin WHERE email = $1', [email]);
        } catch (error) {
            throw new Error(` ${error.message}`);
        }
    }
}

module.exports = AdminModel;