const jwt = require('jsonwebtoken')
const SECRET_KEY = "114514"

module.exports = {
    sign: (payload) => {
        return jwt.sign(payload, SECRET_KEY, {
            expiresIn: '2h'
        });
    },
    decode: (token) => {
        return jwt.verify(token, SECRET_KEY);
    }
};