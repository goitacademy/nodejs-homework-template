const passport = require('passport');
const passportJWT = require('passport-jwt');
const User = require('../models/userModel');
require('dotenv').config();
const secret = process.env.SECRET;

const ExtractJWT = passportJWT.ExtractJwt;
const Strategy = passportJWT.Strategy;
const params = {
	secretOrKey: secret,
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
};

passport.use(
	new Strategy(params, function (payload, done) {
		User.find({ _id: payload.id })
			.then(([user]) => {
				if (!user) {
					return done(new Error('User not found'));
				}
				return done(null, user);
			})
			.catch(error => done(error));
	})
);

const authorizeUser = (req, res, next) => {
	passport.authenticate('jwt', { session: false }, (error, user) => {
		if (!user || error) {
			return res.status(401).json({
				status: 'error',
				code: 401,
				message: 'Unauthorized',
				data: 'Unauthorized',
			});
		}
		req.user = user;
		next();
	})(req, res, next);
};

module.exports = { authorizeUser };