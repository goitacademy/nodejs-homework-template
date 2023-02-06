const jwt = require('jsonwebtoken');
const { User } = require('../db/userModel');
const { NotAuthorizedError } = require('../helpers/errors');

const authMiddleware = async (req, res, next) => {
    try {
        const { authorization = '' } = req.headers;
        const [bearer, token] = authorization.split(' ');

        if (bearer !== "Bearer" || !token) {
            next(new NotAuthorizedError("Not authorized"));
        }

        const tokenData = jwt.verify(token, process.env.JWT_SECRET);
        console.log("tokenData", tokenData);
        const user = await User.findById(tokenData._id, '-password -__v');

        if (!user || user.token !== token) {
            next(new NotAuthorizedError("Not authorized"));
        }
        
        req.user = user;
        console.log("req.user", req.user);
        next();
    } catch (err) {
        next(new NotAuthorizedError("Not authorized"));
    };
};

module.exports = {
    authMiddleware
}