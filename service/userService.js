const jwtService = require('./jwtService');
const { HttpError } = require('../helpers');
const { User } = require('./models/userModel');

exports.register = async body => {
    const checkEmailInDB = await User.findOne({ email: body.email });
    if (checkEmailInDB) throw new HttpError(409, 'Email in use');
    const user = await User.create(body);
    user.password = undefined;
    return user;
};

exports.login = async user => {
    const { id } = user;
    const token = jwtService.signToken({ id });
    user.token = token;
    return user.save();
};
exports.logout = async user => {
    user.token = null;
    return user.save();
}

exports.findUserByFilter = (filter = {}) => User.findOne(filter);

exports.updateSubscription = (id, subscription) => User.findByIdAndUpdate(id, subscription, {new: true});