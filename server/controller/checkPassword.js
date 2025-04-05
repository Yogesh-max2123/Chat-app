const bcryptjs = require('bcryptjs');
const UserModel = require('../model/UserModel');
const jwt = require('jsonwebtoken');

async function checkPassword(req, res) {
    try {
        const { password, userId } = req.body;

        // ✅ Validate input fields
        if (!password || !userId) {
            console.log('❌ Password or userId not provided!');
            return res.status(400).json({
                message: 'Password and User ID are required',
                status: 'error',
                error: true,
            });
        }

        // ✅ Find user by ID
        console.log(`🔎 Checking for user with ID: ${userId}`);
        const user = await UserModel.findById(userId);

        // ✅ Check if user exists
        if (!user) {
            console.log('❌ User not found!');
            return res.status(404).json({
                message: 'User not found',
                status: 'error',
                error: true,
            });
        }

        console.log(`✅ User found: ${JSON.stringify(user)}`);

        // ✅ Compare password with hashed password
        const verifyPassword = await bcryptjs.compare(password, user.password);

        if (!verifyPassword) {
            console.log('❌ Invalid password!');
            return res.status(400).json({
                message: 'Invalid password, please try again',
                status: 'error',
                error: true,
            });
        }

        // ✅ Prepare token data
        const tokenData = {
            id: user._id,
            email: user.email,
        };

        // ✅ Set cookie options
        const cookieOptions = {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'Strict',
        };

        // ✅ Generate JWT token
        const token = jwt.sign(tokenData, process.env.JWT_KEY, { expiresIn: '1d' });

        // ✅ Set cookie and return success response
        console.log('✅ Password verified, setting token...');
        return res
            .cookie('token', token, cookieOptions)
            .status(200)
            .json({
                message: 'Login successful',
                status: 'success',
                success: true,
                data: user,
            });
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        return res.status(500).json({
            message: 'Internal Server Error',
            status: 'error',
            error: true,
        });
    }
}

module.exports = checkPassword;
