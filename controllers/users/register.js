const bcrypt = require('bcrypt');
const gravatar = require('gravatar');
const { User } = require('../../models');
const { httpError, ctrlWrapper } = require('../../helpers');

const register = async (req, res) => {
    const { email, password } = req.body;

    const user =  await User.findOne({ email });
    if (user) throw httpError(409, 'Email in use');

    const hashPassword = await bcrypt.hash(password, 10);

    const avatarURL = gravatar.url(email, { s: 250 });

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
    });
    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        },
    });
};

module.exports = ctrlWrapper(register);