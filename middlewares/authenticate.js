const { HttpError } = require('../helpers');
const { User } = require('../models/user');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (!token || bearer !== 'Bearer') {
        next(HttpError(401));
    }
    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
        next(HttpError(401));
        }
        req.user = user;
        next();
    } catch (error) {
        next(HttpError(401));
    }
};

module.exports = authenticate;