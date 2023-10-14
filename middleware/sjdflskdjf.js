// const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');
const secretKey = process.env.JWT_SECRET;
const User = require('../models/users');

const middlewareToken = async (req, res, next) => {
    const { authorization } = req.headers
    const [bearer, token] = authorization.split(' ')

    if (bearer !== 'Bearer') {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Not authorized'
        });
    }

    try {
        const { _id } = jwt.verify(token, secretKey)
        const user = await User.getUserByEmail(_id)

        if (!user || !user.token || user.token !== token) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Not authorized'
            })
        }
        req.user = user
        next()
    } catch (err) {
        next(401, 'Not authorized')
    }
}

module.exports = middlewareToken



// const middlewareToken = (req, res, next) => {
//     passport.authenticate('jwt', { session: false }, async (err, user) => {
//         const [, token] = req.header('Authorization').split(' ')
//         if (!user || err || token !== user.token) {
//             return res.status(401).json({
//                 status: 'error',
//                 code: 401,
//                 message: 'Not authorized'
//             })
//         }
//         req.user = user;
//         return next();
//     })(req, res, next);
// };

// module.exports = middlewareToken;