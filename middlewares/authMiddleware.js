const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    // if (req.headers.authorization.tokenType) {
    const [tokenType, token] = req.headers["authorization"].split(" "); //* Bearer
    console.log("tokenType:".bgGreen.black, tokenType); //!
    console.log("token:".bgGreen.black, token); //!
    console.log("");
    // }

    if (!token) {
        throw Error(`Please, provide a token`)
    }
    try {
        const user = jwt.decode(token, process.env.JWT_SECRET);
        req.token = token;
        req.user = user;
        next();
    } catch (error) {
        console.log("Invalid token");
        next(error);
    }

}

module.exports = authMiddleware
