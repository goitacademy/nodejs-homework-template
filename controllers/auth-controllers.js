const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const path = require("path");
const {nanoid} = require("nanoid");

const {User} = require("../models/contacts/users");
const {ScalePhoto, sendEmail} = require("../helpers");

const {SECRET_KEY, BASE_URL} = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

async function register (req, res, next) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(user) {
            return res.status(409).json({
                message: "Email in use"
            })
        }
    
        const hashPassword = await bcrypt.hash(password, 10);
        const avatarURL = gravatar.url(email);
        const verificationToken = nanoid();

        const result = await User.create({...req.body, password: hashPassword, avatarURL, verificationToken});
    
        const verifyEmail = {
            to: email,
            subject: "Verify email",
            html: `<a target="_blank" href="${BASE_URL}/users/verify/${verificationToken}">Click verify email</a>`
        };

        await sendEmail(verifyEmail);

        res.status(201).json({ "user":
        {"email": result.email,
        "subscription": result.subscription,}
    })
    }
    catch(error) {
        next(error);
    }
}

async function verify (req, res) {
    const {verificationToken} = req.params;
    const user = await User.findOne({verificationToken});
    if(!user) {
        return res.status(404).json({
            message: "User not found"
    })
    }

    await User.findByIdAndUpdate(user._id, {
        verify: true,
        verificationToken: null,
    });
    // res.redirect("sitename.com/?token=token")
    res.status(200).json({
        message: "Verification successful",
    });
}

async function resendVerifyEmail (req, res) {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user){
        return res.status(404).json({
            message: "User not found"
    })
    }

    if(user.verify){
        return res.status(400).json({
            message: "Verification has already been passed"
    })
    }

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/users/verify/${user.verificationToken}">Click verify email</a>`
    };

    await sendEmail(verifyEmail);

    res.status(200).json({
        message: "Verification email sent"
    })
}

async function login (req, res, next) {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({email});
        if(!user) {
            return res.status(401).json({
                message: "Email or password is wrong"
        })
        }

        if(!user.verify) {
            return res.status(401).json({
                message: "Email not verify"
        })
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            return res.status(401).json({
            message: "Email or password is wrong"
        })
        }

        const payload = {
            id: user._id,
        }

        const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
        const result = await User.findByIdAndUpdate(user._id, {token}, { new: true });

        res.status(201).json({
            token,
            "user":
                {"email": result.email,
                "subscription": result.subscription,}
        })
    }
    catch(error) {
        next(error);
    }
}

async function getCurrent (req, res, next) {
    try {
        const { _id } = req.user;
        const{ email, subscription } = await User.findById(_id);
        
        res.status(200).json({
            email,
            subscription,
        })
    }
    catch(error) {
        next(error);
    }
}

async function logout (req, res, next) {
    try {
        const {_id} = req.user;

        await User.findByIdAndUpdate(_id, {token: ""});

        res.status(204).json({
            message: "Logout success"
        })
    }
    catch(error) {
        next(error);
    }
}

async function updateUserSubscript (req, res) {

    const { _id } = req.user;

    const result = await User.findByIdAndUpdate( _id, req.body, { new: true } );

    res.status(200).json({
        "email": result.email,
        "subscription": result.subscription
    });

};

async function updateAvatar (req, res) {
    const {_id} = req.user;
    const {path: tempUpload, filename} = req.file;
    const avatarName = `${_id}_${filename}`;
    const resultUpload = path.join(avatarsDir, avatarName);
    await fs.rename(tempUpload, resultUpload);
    ScalePhoto(resultUpload);
    const avatarURL = path.join("avatars", avatarName);
    const user = await User.findByIdAndUpdate(_id, {avatarURL});

    if (!user) {
        return res.status(401).json({
            message: "Not authorized"
    })
    }

    res.json({avatarURL});
}


module.exports = {
    register,
    verify,
    resendVerifyEmail,
    login,
    getCurrent,
    logout,
    updateUserSubscript,
    updateAvatar,
}