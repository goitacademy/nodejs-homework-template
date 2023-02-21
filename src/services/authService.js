const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const { v4: uuidv4 } = require('uuid');
const { User } = require('../db/userModel');
const { RegistrationConflictError, NotAuthorizedError, NotFoundError } = require('../helpers/errors');
const sendEmail = require('../helpers/sendEmail');
require('dotenv').config();

const signup = async (email, password, subscription, avatarURL) => {
    const user = await User.findOne({ email });
    
    if (user) {
        throw new RegistrationConflictError("Email in use");
    };

    const verificationToken = uuidv4();

    const newUser = await User.create({
        email,
        password,
        subscription,
        avatarURL: gravatar.url(email),
        verificationToken,
    });

    await sendEmail({
        to: email,
        subject: 'Verification email',
        text: `Please, confirm your email address POST http://localhost:8083/api/auth/users/verify/${verificationToken}`,
        html: `Please, confirm your email address POST http://localhost:8083/api/auth/users/verify/${verificationToken}`,
    });

    return newUser;
};

const verifyEmail = async (verificationToken) => {
    const user = await User.findOne({ verificationToken });
    
    if (!user) {
        throw new NotFoundError('User not found');
    };

    await User.findByIdAndUpdate(
        { _id: user._id },
        { verificationToken: 'verified', verify: true }
    );

    await sendEmail({
        to: user.email,
        subject: 'Thank you for registration!',
        text: `Verification successful`,
        html: `Verification successful`,
    });
};

const login = async (email, password, subscription) => {
    const user = await User.findOne({ email, verify: true });

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
    verifyEmail,
    login,
    logout,
    updateSubscription,
    updateAvatar,
};