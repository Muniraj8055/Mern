const userModel = require("../models/userModel");
const { hashedPassword } = require("../helpers/authHelper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const JWT_SECRET = "jdbchdhbcgh";

const registerController = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;
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

//Test controller
const testController = (req, res) => {
  res.send("protected route");
};

module.exports = { registerController, loginController, testController };
