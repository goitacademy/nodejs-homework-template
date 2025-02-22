const bcrypt = require('bcryptjs');
const {User} = require('../../models/user');
const gravatar = require('gravatar');

const {HttpError, ctrlWrapper} = require('../../helpers');

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, 'Email in use')
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});

    res.status(201).json({
        "user": {
            "email": newUser.email,
            "subscription": "starter",
        }
    })
}

module.exports = {
    register: ctrlWrapper(register),
}