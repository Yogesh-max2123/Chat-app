const UserModel = require('../model/UserModel');

async function checkEmail(req, res) {
    try {
        const { email } = req.body;

        // Log to check if email is received correctly
        console.log('✅ Checking Email:', email);

        // Check if the email exists in the database (excluding password)
        const checkEmail = await UserModel.findOne({ email: email }).select('-password');

        if (!checkEmail) {
            console.log('❌ Email not found');
            return res.status(400).json({
                message: 'User does not exist',
                status: 'error',
                error: true,
            });
        }

        console.log('✅ User found:', checkEmail);
        return res.status(200).json({
            message: 'User exists, Email Verified',
            status: 'success',
            success: true,
            data: checkEmail,
        });

    } catch (error) {
        console.error('❌ Error occurred:', error.message);
        return res.status(500).json({
            message: 'Internal server error',
            status: 'error',
            error: true,
        });
    }
}

// ✅ Correct Export
module.exports = checkEmail;
