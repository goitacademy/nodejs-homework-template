const jwt = require('jsonwebtoken');

const { HttpError } = require('../helpers');

const { User } = require('../models/user');

const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    if (!authorization || authorization === '') {
        return next(HttpError(401, 'No token provided'));
    }
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer' || !token) {
        next(HttpError(401, 'Invalid token format'));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            next(HttpError(401, 'Invalid token'));
        }
        req.user = user;
        next();
    } catch {
        next(HttpError(401, 'Invalid token'));
    }
};

module.exports = authenticate;
