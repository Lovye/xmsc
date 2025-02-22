require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = {
  sign: (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: '2h'
    });
  }
};