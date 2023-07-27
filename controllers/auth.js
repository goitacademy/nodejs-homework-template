const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');
const Jimp = require('jimp');

const { randomUUID } = require('crypto');
const { User } = require('../models/user');
const { HttpError, ctrlWrapper, sendEmail } = require('../helpers');
const { SECRET_KEY, BASE_URL } = process.env;

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async(req, res) => {
    const { email, password, subscription } = req.body;

    const user = await User.findOne({email});
    if(user){
        throw HttpError(409, 'Email already in use');
    };

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = randomUUID();

    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        verificationToken,
        subscription,
        avatarURL,
    });

    const verifyEmail = {
        to: email,
        subject: 'Сonfirm your registration',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationToken}">Click to confirm your registration</a>`,
    };

    await sendEmail(verifyEmail);

    res.status(201).json({
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarUrl,
    })
};

const verify = async(req,res) => {
    const { verificationToken } = req.params;

    const user = await User.findOne({ verificationToken });
    if(!user) {
        throw HttpError(404);
    }
    await User.findByIdAndUpdate(user._id, {verify: true, verificationToken: ''});

    res.json({
        message: 'Verification successful',
    });
};

const resendVerifyEmail = async(req,res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(404, 'User not found');
    }
    if (user.verify) {
        throw HttpError(400, 'Verification has already been passed');
    };

    const verifyEmail = {
        to: email,
        subject: 'Сonfirm your registration',
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click to confirm your registration</a>`,
    };

    await sendEmail(verifyEmail);

    res.json({
        message: 'Verification email sent',
    });
};

const login = async(req, res) => {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if(!user || !user.verify) {
        throw HttpError(401, 'Email or password invalid');
    };

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, 'Email or password invalid');        
    };

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});
    await User.findByIdAndUpdate(user._id, { token });

    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
};

const getCurrent = async(req, res) => {
    const { email, name } = req.user;

    res.json({
        email,
        name,
    })
};

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' });

    res.json({
        message: 'Logout success',
    });
};

const updateSubscription = async (req, res) => {
    const { _id } = req.user;

    const result = await User.findByIdAndUpdate(_id, req.body, {
        new: true,
    });

    if (!result) {
        throw HttpError(404, `Not found`);
    }

    res.json({ result });
};

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tempUpload, originalname } = req.file;

    Jimp.read(tempUpload)
        .then((avatar) => {
            return avatar
                .resize(250, 250) // resize
                .quality(60) // set JPEG quality
                .write(resultUpload); // save
        })
        .catch((err) => {
            throw(err);
        });

    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);

    const avatarURL = path.join('avatars', filename);
    
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({avatarURL});
};

module.exports = {
    register: ctrlWrapper(register),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
};