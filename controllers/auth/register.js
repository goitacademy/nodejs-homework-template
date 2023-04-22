const bcrypt = require('bcrypt');
const { Conflict } = require('http-errors');

const { User } = require('../../models/user');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Conflict('Email in use');
        }

        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            ...req.body,
            password: hashPassword,
        });

        res.status(201).json({
            user: {
                email: newUser.email,
                subscription: newUser.subscription,
            },
        });
    } catch (error) {
        next(error);
    }
};

module.exports = register;
