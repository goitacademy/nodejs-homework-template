const User = require('../models/user');
const RequestError = require('../helpers/RequestError');

const register = async ({ email, password }) => {
    const userExists = await User.findOne({ email });

    if (userExists) throw RequestError(409, 'Email in use');

    const user = new User({ email });
    user.setPassword(password);
    const newUser = await user.save();

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

const logOut = async id => {
    const user = await User.findById(id);
    if (!user) throw RequestError(401, 'Not authorized');

    user.deleteToken();
    await user.save();
};

const listCurrent = async id => {
    const user = await User.findById(id, 'email subscription');
    if (!user) throw RequestError(401, 'Not authorized');

    return user;
};

module.exports = {
    register,
    logIn,
    logOut,
    listCurrent,
};
