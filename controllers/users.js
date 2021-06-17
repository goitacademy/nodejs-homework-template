const Users = require('../repositories/users');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const { HttpCode } = require('../helpers/constants');
const SECRET_KEY = process.env.SECRET_KEY;

const register = async (req, res, next) => {
    try {

        const user = await Users.findByEmail(req.body.email);

        if (user) {
            return res.status(HttpCode.CONFLICT).json({
                status: 'error',
                code: HttpCode.CONFLICT,
                message: 'User with this email is already exist',
            });
        };

        const { name, email, subscription } = await Users.create(req.body);

        return res.status(HttpCode.CREATED).json({
            status: 'success',
            code: HttpCode.CREATED,
            data: { name, email, subscription }
        });

    } catch (e) {
        next(e);
    };
};

const login = async (req, res, next) => {
    try {
        const user = await Users.findByEmail(req.body.email);
        const isValidPassword = await user?.isValidPassword(req.body.password);

        if (!user || !isValidPassword) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: 'Email or password is wrong',
            });
        };

        const { id, name, email, subscription } = user;
        const payload = { id };
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '2h' });

        await Users.updateToken(id, token);
        return res.json({ status: 'success', code: HttpCode.OK, data: { token, user: { name, email, subscription } } });
    } catch (e) {
        next(e);
    };
};

const current = async (req, res, next) => {
    try {
        const user = await Users.findByToken(req.user.token);

        if (!user) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: 'Not authorized',
            });
        };

        const { email, subscription } = user;

        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { email, subscription }
        });
    } catch (e) {
        next(e);
    };
};

const updateSubscription = async (req, res, next) => {
    try {
        const user = await Users.findByToken(req.user.token);

        if (!user) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: 'Not authorized',
            });
        };

        if (!req.body?.subscription) {
            return res.status(HttpCode.BAD_REQUEST).json({
                status: 'error',
                code: HttpCode.BAD_REQUEST,
                message: 'No valid request body',
            });
        }

        const { id, email } = user;
        let { subscription } = user;
        subscription = req.body.subscription.toLowerCase();

        await Users.updateSubscription(id, subscription);

        return res.status(HttpCode.OK).json({
            status: 'success',
            code: HttpCode.OK,
            data: { email, subscription }
        });
    } catch (e) {
        next(e);
    };
};

const logout = async (req, res, next) => {
    try {
        const user = await Users.findById(req.user._id);

        if (!user) {
            return res.status(HttpCode.UNAUTHORIZED).json({
                status: 'error',
                code: HttpCode.UNAUTHORIZED,
                message: 'Not authorized',
            });
        };

        const id = user.id;
        await Users.updateToken(id, null)
        return res.status(HttpCode.NO_CONTENT).json({});
    } catch (e) {
        next(e)
    };
};

module.exports = { register, login, logout, current, updateSubscription };