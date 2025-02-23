const jwt = require('jsonwebtoken')
const jwtSecret = "114514"

module.exports = {
  sign: (payload) => {
    return jwt.sign(payload, jwtSecret, {
      expiresIn: '2h'
    });
  }
};