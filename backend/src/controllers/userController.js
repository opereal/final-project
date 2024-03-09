const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { getCurrentUser } = require("../services/userServices");

const getUserById = async (req, res) => {
  const { id } = req.user; // querying database for the logged in user's id

  try {
    const user = await getCurrentUser(id);

    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    return res.status(200).json({ user: req.user });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Something went wrong fetching user by id." });
  }
};

module.exports = { getUserById };
