const jwt = require('jsonwebtoken');
const UserModel = require('../model/UserModel');

const getUserDetailsFromToken = async (token) => {
  try {
    console.log("Received token in helper:", token);
    if (!token) return null;

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY
    );
    const user = await UserModel.findById(decoded.id).select("-password");

    return user;
  } catch (error) {
    console.error("Error decoding token:", error.message);
    return null; // ✅ Just return null so it fails the user check gracefully
  }
};

module.exports = getUserDetailsFromToken;
