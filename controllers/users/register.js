const bcrypt = require('bcryptjs');
const {User} = require('../../models/user');
const gravatar = require('gravatar');
const {nanoid} = require('nanoid');

const {HttpError, ctrlWrapper, sendEmail} = require('../../helpers');

const {BASE_URL} = process.env;

const register = async(req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, 'Email in use')
    }

    const hashPassword = bcrypt.hashSync(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});

    const verifyEmail = {
        to: email,
        subject: 'Verify email',
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a> `
    };

    await sendEmail(verifyEmail);

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