const User = require('../models/user');
const RequestError = require('../helpers/RequestError');

const register = async ({ email, password }) => {
    const userExists = await User.findOne({ email });

    if (userExists) throw RequestError(409, 'Email in use');

    const newUser = new User({ email });
    newUser.setPassword(password);
    await newUser.save();

    return {
        email: newUser.email,
        subscription: newUser.subscription,
    };
};

const logIn = async ({ email, password }) => {
    const user = await User.findOne({ email });
    if (!user) throw RequestError(404, 'Not found');

    if (!user.validatePassword(password))
        throw RequestError(401, 'Email or password is wrong');

    user.setToken({ id: user.id });

    const loggedInUser = await user.save();

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
