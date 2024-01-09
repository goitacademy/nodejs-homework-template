const jwtService = require('./jwtService');
const { HttpError } = require('../helpers');
const { User } = require('./models/userModel');
const ImageService = require('./imageService');

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

exports.updateSubscription = (userId, subscription) =>
    User.findByIdAndUpdate(userId, subscription, { new: true });

exports.updateAvatar = async (userId, file) => {
    console.log("userId:", userId)
    const avatarURL = await ImageService.saveImages(file, {}, 'images', 'users', 'avatars', userId);
    await User.findByIdAndUpdate(userId, {avatarURL})
    return avatarURL
}