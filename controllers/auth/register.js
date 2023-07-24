const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { nanoid } = require('nanoid');
require('dotenv').config();

const { User } = require('../../models/user');

const { HttpError } = require('../../helpers');
const { sendMail } = require('../../services/email');

const { BASE_URL } = process.env;

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user) {
        throw HttpError(409, 'Email already in use');
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationToken,
    });
    const verifyEmail = {
        to: email,
        subject: 'verify email',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click verify email</a>`,
    };

    await sendMail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        verify: newUser.verify,
        verificationToken: newUser.verificationToken,
    });
};

module.exports = register;
