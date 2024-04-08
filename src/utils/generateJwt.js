require("dotenv").config();

const jwt = require('jsonwebtoken');

function generateJwt(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "12h" });
  return token;
}

module.exports = { generateJwt };
