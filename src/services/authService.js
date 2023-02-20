const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const sgMail = require('@sendgrid/mail');
const { User } = require('../db/userModel');
const { RegistrationConflictError, NotAuthorizedError } = require('../helpers/errors');
require('dotenv').config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const signup = async (email, password, subscription, avatarURL) => {
    const user = await User.findOne({ email });
    
    if (user) {
        throw new RegistrationConflictError("Email in use");
    };

    const newUser = await User.create({
        email,
        password,
        subscription,
        avatarURL: gravatar.url(email),
    });

    const msg = {
        to: email,
        from: 'antifishka.zp@gmail.com', 
        subject: 'Thank you for registration!',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    await sgMail.send(msg);
    return newUser;
};

const login = async (email, password, subscription) => {
    const user = await User.findOne({ email });

    if (!user || !await bcrypt.compare(password, user.password)) {
        throw new NotAuthorizedError("Email or password is wrong");
    }

    const payload = {
        _id: user._id,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
    await User.findByIdAndUpdate(user._id, { token });
    user.token = token;
     
    const data = { token: token, user: user };
    return data;
};

const logout = async (_id ) => {
    await User.findByIdAndUpdate(_id, { token: null });
};

const updateSubscription = async (_id, subscription ) => {
    const user = await User.findByIdAndUpdate(_id, { subscription });
    user.subscription = subscription;
    return user;
};

const updateAvatar = async (_id, temporaryName, originalname) => {
    console.log("temporaryName", temporaryName);
    const avatarsDir = path.resolve('./public/avatars');
    const [, extension] = originalname.split('.');
    const avatarName = `${_id}.${extension}`;

    try {
        const avatar = await Jimp.read(temporaryName);
        avatar.resize(250, 250);

        const avatarPath = path.join(avatarsDir, avatarName);
        console.log("avatarPath", avatarPath);
        await fs.rename(temporaryName, avatarPath);
        const avatarURL = path.join("avatars", avatarName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        return avatarURL;
    } catch (err) {
        await fs.unlink(temporaryName);
        throw new Error(err.message);
    }
};

module.exports = {
    signup,
    login,
    logout,
    updateSubscription,
    updateAvatar,
};