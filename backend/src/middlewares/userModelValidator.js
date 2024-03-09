const validateUserModelData = (req, res, next) => {
  const { email, password } = req.body;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
  const strongPasswordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/; // Regular expression for password

  // CHECK IF EMAIL AND PASSWORD ARE PROVIDED
  if (!email || !password) {
    return res.status(400).send({ error: "Email and password are required" });
  }

  // CHECK IF EMAIL IS A VALID EMAIL FORMAT
  if (!emailRegex.test(email)) {
    return res.status(400).send({ error: "Invalid email format" });
  }

  // CHECK IF Password contains at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.
  if (!strongPasswordRegex.test(password)) {
    return res.status(400).send({
      error:
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
    });
  }

  next();
};

module.exports = { validateUserModelData };
