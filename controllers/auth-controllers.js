const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');
const nanoid = require("nanoid");


const { User}  = require('../models/user');

const { HttpError, controllerWrapper, sendEmail } = require('../helpers');

const { SECRET_KEY, BASE_URL } = process.env;

// singup
const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) { 
        throw HttpError(409, "Email already exist");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email); //під час реєстрації створюємо шаблонну аватарку

    const verificationCode = "1234567890"; //nanoid() викидає помилку  [not a function]

    const result = await User.create({ ...req.body, password: hashPassword, avatarURL, verificationCode });

    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}" >Click verify email</a>`
    };    
    await sendEmail(verifyEmail);

    res.status(201).json({
        name: result.name,
        email: result.email,
    })
};

// verify
const verify = async (req, res) => {
    const { verificationCode } = req.params;
    const user = await User.findOne( {verificationCode} );
    if (!user) { 
        throw HttpError(404);
    }
    await User.findByIdAndUpdate(user._id, { verify: true, verificationCode: "" });

    res.json({
        message: "Verify success"
    })
};

// again VerifyEmail
const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) { 
        throw HttpError(404);
    }
    if (user.verify) { 
        throw HttpError(400, "Email already verify")
    }
    const verifyEmail = {
        to: email,
        subject: "Verify email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}" >Click verify email</a>`
    };    
    await sendEmail(verifyEmail);
    res.json({
        message: "Verify email resend"
    });

};

// signin
const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) { 
        throw new HttpError(401);
    };
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw new HttpError(401)
    };
    const { _id: id } = user;
    const payload = { id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, {token});    
    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
        }
    });
};

// current
const getCurrent = async (req, res) => {
    const { name, email } = req.user;
    res.json({
        user: {
            name,
            email
        }
    })
};

// logout
const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({
        message:"Logout success"
    })
};

// updateSubscription
const updateSubscription = async (req, res) => {
    const result = await User.findByIdAndUpdate(req.user._id, req.body, { new: true });
res.json(result);
};

// updateAvatar
const avatarsDir = path.resolve("public", "avatars");

const updateAvatar = async (req, res) => { 
    const { path: tempUpload, filename } = req.file;
    const img = await jimp.read(tempUpload);
    await img.resize(250, 250, jimp.RESIZE_BEZIER);
    await img.writeAsync(tempUpload);
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await User.findByIdAndUpdate(req.user._id, { avatarURL });

    res.json({
        avatarURL
    });
}

module.exports = {
    register: controllerWrapper(register),
    verify: controllerWrapper(verify),
    resendVerifyEmail: controllerWrapper(resendVerifyEmail),
    login: controllerWrapper(login),
    getCurrent: controllerWrapper(getCurrent),
    logout: controllerWrapper(logout),
    updateSubscription: controllerWrapper(updateSubscription),
    updateAvatar: controllerWrapper(updateAvatar),
};

