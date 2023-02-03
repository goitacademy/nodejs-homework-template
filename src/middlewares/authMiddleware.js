const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require('../helpers/errors');

const authMiddleware = async (req, res, next) => {
    try {
        const { authorization = '' } = req.headers;
        const [bearer, token] = authorization.split(' ');

        if (bearer !== "Bearer" || !token) {
            next(new NotAuthorizedError("Not authorized"));
        }

        const user = jwt.verify(token, process.env.JWT_SECRET);
        console.log("user", user);

        // if (!user || user.token !== token) {
        //     next(new NotAuthorizedError("Not authorized"));
        // }
        
        req.user = user;
        next();
    } catch (err) {
        next(new NotAuthorizedError("Not authorized"));
    };
};

module.exports = {
    authMiddleware
}