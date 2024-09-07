const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../dataModels/userModel");
require("dotenv").config();

// Register a new user
const register = async (req, res) => {
  console.log("register", req.body);
  try {
    const { firstName, lastName, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Create JWT token
    const token = jwt.sign(
      { userId: newUser._id, email: newUser.email },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    return res
      .status(201)
      .json({ token, message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
};

//LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create a JWT token
    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "2h",
      }
    );

    res.status(200).json({
      token: token,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      message: "Logged in successfully",
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = { register, login };
