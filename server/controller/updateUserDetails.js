const getUserDetailsFromToken = require("../helper/getUserDetailsFromToken");
const UserModel = require("../model/UserModel");

async function updateUserDetails(req, res) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("Token received:", token);

    const user = await getUserDetailsFromToken(token);
    console.log("User from token:", user);

    if (!user || !user._id) {
      return res.status(400).json({
        message: "Invalid token or user not found",
        error: true,
      });
    }

    const { name, profile_pic } = req.body;
    console.log("Request Body:", req.body);

    if (!name && !profile_pic) {
      return res.status(400).json({
        message: "At least one of 'name' or 'profile_pic' must be provided",
        error: true,
      });
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      user._id,
      { name, profile_pic },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found or update failed",
        error: true,
      });
    }

    return res.status(200).json({
      message: "User Updated Successfully!",
      data: updatedUser,
      success: true,
    });
  } catch (error) {
    console.error("Update user error:", error);
    return res.status(500).json({
      message: "Internal Server Error: " + error.message,
      error: true,
    });
  }
}

module.exports = updateUserDetails;
