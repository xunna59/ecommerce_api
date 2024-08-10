const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const { JWT_SECRET } = require('../config/config');
const AdminModel = require('../models/adminModel');
const adminModel = new AdminModel();


// This function handles creating a new user
const register = async (req, res, next) => {
    // Validate Request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const role = 'admin';

    try {
        const admin = await adminModel.createAdmin(username, email, hashedPassword, role);
        res.status(201).json({ success: true, message: 'Admin created successfully', admin });
    } catch (error) {
        next(error);
    }
};


// This function handles User Login
const login = async (req, res, next) => {
    // Validate Request 
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const errorMessage = errors.array()[0].msg;
        return res.status(400).json({ success: false, message: errorMessage });
    }
    // Proceed with request if no errors are found during validation

    const { email, password } = req.body;

    try {
        const admin = await adminModel.findAdminByEmail(email);
        if (!admin) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Invalid login credentials' });
        }

        const token = jwt.sign({ adminId: admin.id, adminRole: admin.role }, JWT_SECRET, { expiresIn: '1h' });
        // Set the token as an HTTP-Only cookie
        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        res.json({ message: 'Login successful', token: token, role: admin.role });

    } catch (error) {
        next(error);
    }
};

const getProfile = async (req, res) => {
    try {
        // Ensure user is authenticated
        if (!req.admin || !req.admin.adminId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        const adminId = req.admin.adminId;

        const adminProfile = await adminModel.findById(adminId);

        // Check if the user was found
        if (!adminProfile) {
            return res.status(404).json({ error: 'User not found' });
        }


        res.status(200).json({ success: true, profile: adminProfile });
    } catch (error) {
        next(error);
    }
};

const authenticateToken = (req, res, next) => {
    const authHeader = req.header('Authorization');

    if (!authHeader) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    const token = authHeader.replace('Bearer ', '');

    if (!token) {
        return res.status(401).json({ error: 'Access denied. Invalid token format.' });
    }

    try {
        const verified = jwt.verify(token, JWT_SECRET);
        req.admin = verified;
        next();
    } catch (error) {
        res.status(400).json({ error: 'Invalid token' });
    }
};

module.exports = {
    register,
    login,
    getProfile,
    authenticateToken,
};
