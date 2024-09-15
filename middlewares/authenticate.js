const jwt = require('jsonwebtoken');
const { Unauthorized } = require('http-errors');

const { User } = require('../models/user');
const { SECRET_KEY } = process.env;

const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
        next(Unauthorized());
    }

    try {
        const { id } = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);

        if (!user || !user.token || user.token !== token) {
            next(Unauthorized('Not authorized'));
        }
        req.user = user;
        next();
    } catch (error) {
        next(Unauthorized('Not authorized'));
    }
};

module.exports = authenticate;
