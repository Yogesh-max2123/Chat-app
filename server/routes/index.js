const express = require('express');
const userRegister = require('../controller/UserRegister'); // ✅ Check exact casing
const checkEmail = require('../controller/checkEmail'); // ✅ Check exact casing
const checkPassword = require('../controller/checkPassword');
const userDetails = require('../controller/userDetails'); // ✅ Check exact casing
const logout = require('../controller/logout'); // ✅ Check exact casing
const updateUserDetails = require('../controller/updateUserDetails');
const UserRegister = require('../controller/UserRegister');
const router = express.Router();

// Debug statement to verify route loading
console.log('✅ Routes loaded correctly');


router.post('/register',UserRegister)
//check user email
router.post('/email',checkEmail)
//check user password
router.post('/password',checkPassword)
//login user details
router.get('/user-details',userDetails)
//logout user
router.get('/logout',logout)
//update user details
router.post('/update-user',updateUserDetails)


module.exports = router;
