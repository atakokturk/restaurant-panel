const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const JWT = require("jsonwebtoken");
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address, answer } = req.body;       
    if (!username || !email || !password || !phone || !address || !answer) {
      return res.status(500).send({
        success: false,
        message: "Please try again",
      });
    }

    //check users

    const isNameExist = await userModel.findOne({ username });
    if (isNameExist) {
      return res.status(500).send({                                         
        success: false,
        message: "Username already taken.",
      });
    }

    const isEmailExist = await userModel.findOne({ email });
    if (isEmailExist) {
      return res.status(500).send({
        success: false,                                                   
        message: "E-mail already registered. Please login",
      });
    }

    const isPhoneExist = await userModel.findOne({ phone });
    if (isPhoneExist) {
      return res.status(500).send({                                    
        success: false,
        message: "Phone number already taken.",
      });
    }

    //!hashing
    const salt = bcrypt.genSaltSync(10);
    hashedPassword = await bcrypt.hash(password, salt);                  

    //create new user
    const user = await userModel.create({
      username,
      email,
      password: hashedPassword,
      phone,
      address,
      answer,                                                    
    });
    res.status(201).send({
      succes: true,
      messaage: "User registered",
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Error in register API",
      err,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).send({
        succes: false,
        message: "Please provide E-mail or Password",                                           
        err,
      });
    }                                                                 
    //check user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    //token
    const token = JWT.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Logged in",
      token,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      succes: false,
      message: "Error in login API",
      err,
    });
  }
};

module.exports = { registerController, loginController };
