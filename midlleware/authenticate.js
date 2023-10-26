const HttpErr = require('../helpers/HttpErr');
const jwt = require('jsonwebtoken')
const TOKEN_KEY = 'hashfhhjgh1k2h3kjho9999888';
const { User } = require('../models/user');

const authenticate = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');
    if (bearer !== 'Bearer') {
        next(HttpErr(401));
    }

    try {
        const { id } = jwt.verify(token, TOKEN_KEY);
        const user = await User.findOne({id});
        if (!user || !user.token || user.token !== token) {
            throw HttpErr(401);
        }

        req.user = user;
        next();
    } catch (error) {
        next(HttpErr(401));
    }
};

module.exports = authenticate;
