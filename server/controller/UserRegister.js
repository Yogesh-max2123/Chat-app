const UserModule = require('../model/UserModel');
const bcryptjs = require('bcryptjs');

async function UserRegister(request, response) {
    console.log('✅ Inside userRegister');
    try {
        console.log('✅ Request body:', request.body);

        const { name, email, password, profile_pic } = request.body;

        if (!name || !email || !password) {
            console.log('❌ Missing required fields');
            return response.status(400).json({
                message: 'Missing required fields',
                status: 'error',
                error: true,
            });
        }

        const checkEmail = await UserModule.findOne({ email: email });
        if (checkEmail) {
            console.log('❌ Email already exists');
            return response.status(400).json({
                message: 'Email already exists',
                status: 'error',
                error: true,
            });
        }

        console.log('✅ Email not found, proceeding to register');

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt);
        console.log('✅ Password hashed successfully');

        const payload = {
            name,
            email,
            profile_pic,
            password: hashPassword,
        };

        console.log('✅ Payload:', payload);

        const user = await UserModule.create(payload);
        console.log('✅ User created successfully:', user);

        return response.status(201).json({
            message: 'User registered successfully',
            status: 'success',
            success: true,
            data: user,
        });
    } catch (err) {
        console.log('❌ Error occurred:', err.message);
        return response.status(500).json({
            message: 'Internal server error',
            status: 'error',
            error: true,
        });
    }
}

module.exports = UserRegister;
