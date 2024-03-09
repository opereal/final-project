const express = require("express");
const requireSignin = require("../middlewares/authTokenValidation");
const { getUserById } = require("../controllers/userController");
const router = express.Router();

router.get("/users/me", requireSignin, getUserById);

module.exports = router;
