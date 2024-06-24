import User from "../models/user.model.js";

export const profile = async (req, res, next) => {
  try {
    const userId = req.user.id; // This is set by the Passport JWT strategy
    const user = await User.findById(userId).select("-password"); // Fetch user data excluding password

    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    res.status(200).json({
      success: true,
      status: 200,
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      status: 500,
      message: "Server error",
    });
  }
};
