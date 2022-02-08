const createError = require('http-errors');
const jwt = require('jsonwebtoken');

const {SECRET_KEY} = process.env;
const { unauthorized } = require('../lib').HTTP_RESPONSES;
const {User} = require('../models');

const authenticate = async (req, _, next) => {
    try {
        const {authorization = ''} = req.headers;
        const [bearer, token] = authorization.split(" ");
        bearer !== "Bearer" && next(createError(unauthorized.code, unauthorized.status));

        const {id} = jwt.verify(token, SECRET_KEY);
        const user = await User.findById(id);
        (!user || !user.token) && next(createError(unauthorized.code, unauthorized.status));
        req.user = user;

        next();
    } catch (err) {
        if(!err.status) {
            err.status = unauthorized.code;
            err.message = unauthorized.status;
        }
        next(err)
    }
}

module.exports = authenticate;
