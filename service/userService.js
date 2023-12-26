const { jwtService } = require('.');
const { HttpError } = require('../helpers');
const { User } = require('./models/userModel');

exports.register = async body => {
    const checkEmailInDB = await User.findOne({ email: body.email });
    if (checkEmailInDB) throw new HttpError(409, 'Email in use');
    const user = await User.create(body);
    user.password = undefined;
    return user;
};

exports.login = async userData => {
    const { id } = userData;
    const candidate = await User.findById(id);
    const token = jwtService.signToken({ id });
    candidate.token = token;
    candidate.save();
    return token;
};

exports.findUserByFilter = (filter = {}) => User.findOne(filter);
