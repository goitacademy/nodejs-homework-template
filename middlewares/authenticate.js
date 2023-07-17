const jwt = require('jsonwebtoken');

const { errorHandler } = require('../helpers/index');
const { User } = require('../schema');

const { SECRET_WORD } = process.env;

const authenticate = async (req, res, next) => {
    try {
        const { authorization = '' } = req.headers;
        const [bearer, token] = authorization.split(' ');
        if (bearer !== 'Bearer') {
            next(errorHandler(401, 'Not authorized'));
        }

        const { id } = jwt.verify(token, SECRET_WORD);

        const user = await User.findById(id);
        if (!user || !user.token || user.token !== token) {
            next(errorHandler(401, 'Not authorized'));
        }

        req.user = user;
        next();
    } catch (error) {
        next(errorHandler(401, 'Not authorized'));
    }
};

module.exports = authenticate;
