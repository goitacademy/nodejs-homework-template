const { User } = require('../models');
const { RequestError } = require("../utils");
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;




const auth = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const [bearer, token] = authorization.split(' ');

    if (bearer !== "Bearer") {
        next(RequestError(401, "Not authorized"))
    }

    const { id } = jwt.verify(token, SECRET_KEY);

    if (!id) {
        next(RequestError(401, "Not authorized"))
    }

    const user = await User.findById(id);

    if (!user || !user.token) {
        next(RequestError(401, "Not authorized"))
    }

    req.user = user;
    next()
}

module.exports = auth;