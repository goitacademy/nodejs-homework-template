const jwt = require('jsonwebtoken');

const { Unauthorized } = require("http-errors");

const { JWT_SECRET } = process.env;

//-----------------------------------------------------------------------------
const authMiddleware = (req, res, next) => {
    try {
        const [tokenType, token] = req.headers["authorization"].split(" "); //* Bearer
        console.log(""); //!
        console.log("tokenType:".bgGreen.black, tokenType); //!
        console.log("token:".bgGreen.black, token); //!
        console.log(""); //!
        //! Проверка наличия токена
        if (!token) {
            throw new Unauthorized("Not authorized. No token");
        }
        const user = jwt.decode(token, JWT_SECRET);
        //! Проверка валидности токена
        if (!user) {
            console.log("authMiddleware-->user:".bgGreen.magenta, user); //!
            throw new Unauthorized("Not authorized. Invalid token");
        }
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log(error.message);
        next(error);
    }
}

module.exports = authMiddleware
