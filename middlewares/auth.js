const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;
const User = require('../models/user');
const RequestError = require('../helpers/RequestError');

const auth = async (req, res, next) => {
    try {
        const { authorization = '' } = req.headers;
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer') throw RequestError(401, 'Unauthorized');

        const { id } = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(id);

        if (!user || token !== user.token)
            throw RequestError(401, 'Unauthorized');

        req.user = user;

        next();
    } catch (error) {
        if (error.message === 'invalid token') {
            error.status = 401;
            error.message = 'Unauthorized';
        }
        next(error);
    }
};

module.exports = auth;
