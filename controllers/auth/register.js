const bcrypt = require('bcrypt');
const { Conflict } = require('http-errors');

const gravatar = require('gravatar');
const { nanoid } = require('nanoid');

const { sendEmail } = require('../../helpers/');

const BASE_URL = process.env.BASE_URL || 'http://localhost';
const PORT = process.env.PORT || 3000;

const url = `${BASE_URL}:${PORT}`;

const { User } = require('../../models/user');

const register = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user) {
            throw new Conflict('Email in use');
        }

        const avatarURL = gravatar.url(email); //, { protocol: 'https', s: '100',  }
        const hashPassword = await bcrypt.hash(password, 10);
        const verificationToken = nanoid();
        const newUser = await User.create({
            ...req.body,
            password: hashPassword,
            avatarURL,
            verificationToken,
        });

        const verifyEmail = {
            to: email,
            subject: 'Verify email',
            html: `<a target="_blank" href="${url}/users/verify/${verificationToken}">Click to verify your email</a>`,
        };

        await sendEmail(verifyEmail);

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
