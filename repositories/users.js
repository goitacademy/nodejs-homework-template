const User = require('../model/user');

const findById = async (id) => {
    return await User.findById(id);
};

const findByEmail = async (email) => {
    return await User.findOne({ email });
};

const findByToken = async (token) => {
    return await User.findOne({ token });
};

const create = async (body) => {
    const user = new User(body);
    return await user.save();
};

const updateToken = async (id, token) => {
    return await User.updateOne({ _id: id }, { token });;
};

const updateSubscription = async (id, subscription) => {
    return await User.updateOne({ _id: id }, { subscription });;
};

module.exports = {
    findById,
    findByEmail,
    findByToken,
    create,
    updateToken,
    updateSubscription
};