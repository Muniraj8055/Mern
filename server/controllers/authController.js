const userModel = require("../models/userModel");
const { hashedPassword } = require("../helpers/authHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const JWT_SECRET = "jdbchdhbcgh";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address, answer } = req.body;
    //check user
    const existingUser = await userModel.findOne({ email });

    //existing user
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "User already exists",
      });
    }

    //register user
    const hashPassword = await hashedPassword(password);

    //save
    const user = await new userModel({
      name,
      email,
      phone,
      address,
      password: hashPassword,
      answer,
    }).save();

    res.status(201).send({
      success: true,
      message: "User register successful",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "error while registering",
      err,
    });
  }
};

//Login

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }
    //check user
    const existingUser = await userModel.findOne({ email });
    //existing user
    if (!existingUser) {
      return res.status(400).send({
        success: false,
        message: "Invalid Email or Password",
      });
    }

    //check password
    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(400).send({
        success: false,
        message: "Invalid Password",
      });
    }

    //JWT token
    const token = jwt.sign(
      {
        _id: existingUser._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: 86400,
      }
    );

    res.status(200).send({
      success: true,
      message: "Login successful",
      user: {
        name: existingUser.name,
        email: existingUser.email,
        phone: existingUser.phone,
        address: existingUser.address,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.send({
      success: false,
      message: "Error in login",
      error,
    });
  }
};

//forgot password

const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;

    if (!email || !answer || !newPassword) {
      return res.status(400).json({
        success: false,
        message: "Email, answer, and new password are required",
      });
    }

    // Check if the email and answer are correct or not
    const user = await userModel.findOne({ email, answer });

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "Wrong Email or Answer",
      });
    }

    // If the user is correct, update the new password in the database
    const hashed = await hashedPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });

    // Send the response once after all operations
    return res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Wrong Email or Answer",
      error: error.message, // Use error.message to get the error message
    });
  }
};
//Test controller
const testController = (req, res) => {
  res.send("protected route");
};

module.exports = {
  registerController,
  loginController,
  testController,
  forgotPasswordController,
};
