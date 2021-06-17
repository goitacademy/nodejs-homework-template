const passport = require('passport');
require('../config/passport');
const { HttpCode } = require('./constants');

const guard = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (error, user) => {
        const HeaderAuth = req.get('Authorization');

        let token = null;
        if (HeaderAuth) {
            token = HeaderAuth.split(' ')[1];
        };

        if (error || !user || token !== user?.token) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: 'Not authorized',
            });
        };

        req.user = user;
        return next();
    })(req, res, next);
};

module.exports = guard;