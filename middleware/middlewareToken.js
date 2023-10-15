// const passport = require('passport');
const jwt = require('jsonwebtoken');
require('../config/passport');
const secretKey = process.env.JWT_SECRET;
const User = require('../models/users');

const middlewareToken = async (req, res, next) => {
    const { authorization } = req.headers;
    
    if (!authorization) {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Not authorized'
        });
    }
    
    const [bearer, token] = authorization.split(' ');
    
    if (bearer !== 'Bearer') {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Not authorized'
        });
    }
    
    try {
        const { _id } = jwt.verify(token, secretKey);
        
        const user = await User.findById(_id);
        if (!user /* || token !== user.token */) {
            return res.status(401).json({
                status: 'error',
                code: 401,
                message: 'Not authorized'
            });
        }

        req.user = user;
        next();
    } catch (err) {
        return res.status(401).json({
            status: 'error',
            code: 401,
            message: 'Not authorized'
        });
    }
}

module.exports = middlewareToken;

// const passport = require('passport');
// const jwt = require('jsonwebtoken');
// require('../config/passport');
// const secretKey = process.env.JWT_SECRET;
// const User = require('../models/users');

// const middlewareToken = (req, res, next) => {
//     passport.authenticate('jwt', { session: false }, async (err, user) => {
//         if (err || !user) {
//             return res.status(401).json({
//                 status: 'error',
//                 code: 401,
//                 message: 'Not authorized'
//             });
//         }

//         const { authorization } = req.headers;
//         const [bearer, token] = authorization.split(' ');

//         if (bearer !== 'Bearer') {
//             return res.status(401).json({
//                 status: 'error',
//                 code: 401,
//                 message: 'Not authorized'
//             });
//         }

//         try {
//             const { _id } = jwt.verify(token.replace('Bearer ', ''), secretKey);
//             const foundUser = await User.getUserByEmail(_id);

//             if (!foundUser || token !== foundUser.token) {
//                 return res.status(401).json({
//                     status: 'error',
//                     code: 401,
//                     message: 'Not authorized'
//                 });
//             }

//             req.user = user;
//             next();
//         } catch (err) {
//             return res.status(401).json({
//                 status: 'error',
//                 code: 401,
//                 message: 'Not authorized'
//             });
//         }
//     })(req, res, next);
// };

// module.exports = middlewareToken;