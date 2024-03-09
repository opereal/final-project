const express = require("express");
const requireSignin = require("../middlewares/authTokenValidation");
const { userLogin, LogoutUser } = require("../controllers/authController");
const { validateUserModelData } = require("../middlewares/userModelValidator");

const router = express.Router();

router.post("/login", validateUserModelData, userLogin);

router.post("/logout", requireSignin, LogoutUser);

module.exports = router;
