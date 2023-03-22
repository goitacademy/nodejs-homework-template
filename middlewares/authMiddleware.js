const jwt = require('jsonwebtoken');

const { NotAuthorizedError } = require('../helpers/errors');


const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');

    if (!token) {
        next(new NotAuthorizedError("Not authorized"))
    }

    try {
        const user = jwt.decode(token, process.env.JWT_SESCRET);
        req.token = token;
        req.user = user;
        next();
    } catch (err) {
        next(new NotAuthorizedError("Invalid token"))    
    }

};

module.exports = {
    authMiddleware
};

