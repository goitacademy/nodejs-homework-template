const jwt = require('jsonwebtoken');
const { NotAutorizedError } = require('../helpers/errors')


const checedUserMiddleware = (req, res, next) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        next(new NotAutorizedError('Not authorized'))
        return;
    }

    const [tokenType, token] = req.headers.authorization.split(' ');
    // console.log(tokenType, token)

    if (!token) {
        next(new NotAutorizedError('Not authorized'))
    }

    try {
        const user = jwt.decode(token, process.env.JWT_SECRET)
        if (!user) {
            next(new NotAutorizedError('Not authorized'))
        }
        req.user = user;
        next();

    } catch (error) {
        next(new NotAutorizedError('Not authorized'))
    }
};


module.exports = checedUserMiddleware