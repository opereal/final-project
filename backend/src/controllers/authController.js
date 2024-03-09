const bcrypt = require("bcrypt");
const crypto = require("crypto");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const envVariables = require("..//constants/index");
require("dotenv").config();
const { getUserByEmail } = require("../services/userServices");

const userLogin = async (req, res) => {
  const { email, password } = req.body;

  const SECRET = envVariables.JWT_SECRET;

  // jsonwebtoken expiration period
  const expiresIn = 36000;

  let authToken;

  try {
    const userExist = await getUserByEmail(email); // checks if user has already onboarded

    if (userExist) {
      //compare the entered password with the hashed password in database
      const passwordIsMatch = await bcrypt.compare(
        password,
        userExist.password
      );

      if (!passwordIsMatch) {
        return res.status(403).json({ error: "Invalid password!" });
      }

      // jsonwebtoken payload data
      const payload = {
        email: userExist.email,
        id: userExist._id,
      };

      // sign jsonwebtoken with jwt library
      authToken = jwt.sign(payload, SECRET, {
        expiresIn,
      });

      // cookie options object
      const cookieOptions = {
        expires: "36000",
        maxAge: 59 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "none",
        secure: true,
      };

      return res
        .cookie("authToken", authToken, cookieOptions)
        .json({ message: "Login successful.", authToken });
    }

    // if user does not exist
    // hash password using bcrypt
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    // creating a new user here
    const newUser = new User({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    if (!newUser) {
      return res.status(400).json({ error: "User creation failed." });
    }

    // jsonwebtoken payload data
    const payload = {
      email: newUser.email,
      id: newUser._id,
    };

    // sign jsonwebtoken with jwt library
    authToken = jwt.sign(payload, SECRET, { expiresIn });

    // cookie options object
    const cookieOptions = {
      expires: "36000",
      maxAge: 59 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: "none",
      secure: true,
    };

    return res
      .cookie("authToken", authToken, cookieOptions)
      .json({ message: "Login successful.", authToken });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Something went wrong." });
  }
};

const LogoutUser = async (req, res) => {
  const cookieOptions = {
    httpOnly: true,
    sameSite: "none",
    secure: true,
  };
  res
    .clearCookie("authToken", cookieOptions)
    .json({ message: "Logged out successfullly!" });
};

module.exports = { userLogin, LogoutUser };
