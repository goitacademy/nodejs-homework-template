const User = require('../models/user');
const RequestError = require('../helpers/RequestError');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET;

const register = async ({ email, password }) => {
    const [userExists] = await User.find({ email });

    if (userExists) throw RequestError(409, 'Email in use');

    const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

    const newUser = await User.create({
        email,
        password: hashedPassword,
    });

    return {
        email: newUser.email,
        subscription: newUser.subscription,
    };
};

const logIn = async ({ email, password }) => {
    const [user] = await User.find({ email });
    if (!user) throw RequestError(404, 'Not found');

    const passwordValid = bcrypt.compareSync(password, user.password);
    if (!passwordValid) throw RequestError(401, 'Email or password is wrong');

    const payload = {
        id: user.id,
        email: user.email,
    };
    const token = jwt.sign(payload, secret, { expiresIn: '1h' });
    const loggedInUser = await User.findByIdAndUpdate(
        user.id,
        { token },
        {
            new: true,
        },
    );

    return {
        token: loggedInUser.token,
        user: {
            email: loggedInUser.email,
            subscription: loggedInUser.subscription,
        },
    };
};

module.exports = {
    register,
    logIn,
};
