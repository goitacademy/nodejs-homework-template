const jwt = require('jsonwebtoken');

const { NotAuthorizedError } = require('../helpers/errors');

const {User} = require('../db/userModel');


const authMiddleware = (req, res, next) => {
    const { authorization } = req.headers;
    const [, token] = authorization.split(' ');

    if (!token) {
        next(new NotAuthorizedError("Not authorized"))
    }

    try {
    const { id } = jwt.verify(token, process.env.JWT_SESCRET);
    const user =  User.findById(id);
    if (!user || user.token !== token) {
      throw new NotAuthorizedError("Not authorized");
    }
    req.user = user;
    next();
    } catch (err) {
        next(new NotAuthorizedError("Invalid token"))    
    }

};

module.exports = {
    authMiddleware
};

