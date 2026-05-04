import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

function sendProfileResponse(res, user) {
  res.status(200).json({
    id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token: generateToken(user._id),
  });
}

export async function getUserProfile(req, res) {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    sendProfileResponse(res, user);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch profile",
      error: error.message,
    });
  }
}

export async function updateUserProfile(req, res) {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.name = req.body.name || user.name;

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    sendProfileResponse(res, updatedUser);
  } catch (error) {
    res.status(400).json({
      message: "Failed to update profile",
      error: error.message,
    });
  }
}
