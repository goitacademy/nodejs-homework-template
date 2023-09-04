const { HttpError, sendEmail, createVerificationEmail } = require("../helpers");
const { User } = require("../models/user");
const { ctrlWrapper } = require("../utils");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { SECRET_KEY, BASE_URL, PORT } = process.env;
const gravatar = require('gravatar');
const fs = require('fs/promises');
const path = require('path');

const { nanoid } = require("nanoid");
=======

const Jimp = require('jimp');

const avatarDir = path.resolve('public', 'avatars');

const register = async (req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(user) throw HttpError(409, 'Email is already in use');

    const avatarURL = gravatar.url(email);
    // console.log('GRAVATAR ', avatarURL);
    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = nanoid();

    const userCreate = await User.create({email, password: hashedPassword, avatarURL, verificationToken});

    // const verifyLink = `${BASE_URL}:${PORT}/users/verify/${verificationToken}`;
    // const verifyEmail = {
    //     to: email,
    //     subject: 'Verification email',
    //     // html: `<a target="_blank" href="${verifyLink}">Click to verify your email</a>`
    //     html: verifyLink
    // }
    const verifyEmail = createVerificationEmail(verificationToken, email);

    await sendEmail(verifyEmail);

    res.status(201).json({
        user: {
            email: userCreate.email,
            subscription: 'starter'
        }
    })
}

const verify = async (req, res) => {
    const { verificationToken } = req.params;
    // console.log(req.params)
    const user = await User.findOne({verificationToken});

    if(!user) throw HttpError(401, "User not found");

    await User.findByIdAndUpdate(user._id, { verify: true, verificationToken: '' });

    res.json({
        message: 'Verification successful'
    })
}

const resendVerificationLink = async (req, res) => {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if(!user) throw HttpError(404, "User not found");

    if(user.verify) throw HttpError(400, "Verification has already been passed")

    const verifyEmail = createVerificationEmail(user.verificationToken, email);

    await sendEmail(verifyEmail);

    res.json({
        message: "Verification email sent"
    })
}

const login = async (req, res) => {
    const {email, password, subscription} = req.body;

    const user = await User.findOne({email});
    // const userSubscription = user.subscription;
    // console.log(user.password);
    // console.log(subscription);

    if(!user) throw HttpError(401, 'Email or password is wrong');

    if(!user.verify) throw HttpError(401, 'Please verify your email to login');

    const passwordCompareResult = await bcrypt.compare(password, user.password);

    if(!passwordCompareResult) throw HttpError(401, 'Email or password is wrong');

    const payload = {
        id: user._id
    }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '3h'});

    await User.findByIdAndUpdate(user._id, { token });

    // console.log(res.statusCode)
    res.json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
        }
    });
}

const getCurrent = async (req, res, next) => {
    const { authorization = '' } = req.headers;
    const {email, password} = req.body;
    const user = req.user;

    // console.log(user);

    // const user = await User.findOne({email});

    res.json({
        email: user.email,
        subscription: user.subscription
    })
}

const logout = async (req, res) => {
    const { _id: id } = req.user;
    await User.findByIdAndUpdate(id, { token: '' });

    res.status(204).json();
}

const updateAvatar = async (req, res) => {
    // const { description } = req.body;
    const { path: tempPath, originalname } = req.file;
    // console.log('REQ FILE ', req.file);
    const resultDir = path.join(avatarDir, originalname);
    const { _id } = req.user;
    const avatarUrl = path.join('avatars', originalname);

    fs.rename(tempPath, resultDir);

    Jimp.read(`${resultDir}`)
        .then((img) => {
            return img
            .resize(256, 256) // resize
            .quality(60) // set JPEG quality
            // .greyscale() // set greyscale
            .write(resultDir); // save
        })
        .catch((err) => {
            console.error(err);
        });
    
    await User.findByIdAndUpdate(_id, { avatarURL: avatarUrl });

    res.json({
        // file: req.file,
        avatarUrl
    });
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
    verify: ctrlWrapper(verify),
    resendVerificationLink: ctrlWrapper(resendVerificationLink)
}