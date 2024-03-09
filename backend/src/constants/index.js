require("dotenv").config();

const envVariables = {
  PORT: process.env.PORT,
  DB_URI: process.env.DB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
};

module.exports = envVariables;
