const { User } = require('../../models/user');
const { RequestError } = require('../../helpers');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user) {
        throw RequestError(409, 'Email in use');
    }
    const avatarURL = gravatar.url(email);

    const hashPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
        email,
        password: hashPassword,
        avatarURL,
    });

    res.status(201).json({
        user: {
            email: result.email,
            subscription: result.subscription,
            avatarURL,
        },
    });
};

module.exports = register;
