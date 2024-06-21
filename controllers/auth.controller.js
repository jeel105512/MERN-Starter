import passport from "passport";
import User from "../models/user.model.js";

export const register = async (req, res, next) => {
  const { name, email, password, profilePicture } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "User already exists",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Password must be at least 6 characters long",
      });
    }

    const newUser = new User({
      name,
      email,
      password,
      profilePicture,
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      status: 201,
      message: "User created successfully",
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

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    const isCorrectPassword = await user.matchPassword(password);
    if (!isCorrectPassword) {
      return res.status(400).json({
        success: false,
        status: 400,
        message: "Invalid credentials",
      });
    }

    const payload = { id: user.id, name: user.name, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });
    res.status(200).json({
      success: true,
      status: 200,
      token,
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

// Google OAuth login
export const google = passport.authenticate("google", {
  scope: ["profile", "email"],
});

export const googleCallback = (req, res, next) => {
  passport.authenticate("google", (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(404).json({
        success: false,
        status: 404,
        message: "User not found",
      });
    }

    // Successful authentication, respond with JWT token
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "3h",
    });

    res.status(200).json({
      success: true,
      status: 200,
      token,
    });
  })(req, res, next);
};
