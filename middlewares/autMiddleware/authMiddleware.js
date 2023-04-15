const jwt = require('jsonwebtoken');
const { NotAuthorizedError } = require("../../helpers/index");
const { User } = require('../../service/users/userSchema');




const authMiddleware = async (req, res, next) => {
    if (!req.headers.authorization) {
        next(new NotAuthorizedError("Please, provide a token"));
    }
    try {
        const [, token] = req.headers.authorization.split(' ');

        if (!token) {
            next(new NotAuthorizedError('Not authorized-no valid token'));
        }
    
        const user = jwt.decode(token, process.env.JWT_SECRET);
        const existingUser = await User.findById(user._id);
     
    
        if (!existingUser) {
            next(new NotAuthorizedError('Not authorized- invalide token'));
        }

        req.user = existingUser;
        req.token = token;

        next();

    } catch (error) {
        next(new NotAuthorizedError('Invalide token'));

    }
}

module.exports = {
    authMiddleware
}