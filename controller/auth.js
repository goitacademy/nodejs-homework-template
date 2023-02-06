const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const gravatar = require("gravatar")
const fs = require("fs/promises")
const path = require("path")
const { nanoid } = require("nanoid")

const {User} = require("../models/user")

const {HttpError, ctrlWrapper, sendEmail} = require("../helpers")

const {SECRET_KEY, BASE_URL} = process.env;


const register = async(req, res) => {
    const { email, password, name } = req.body;
    const user = await User.findOne({email});

    if(user) {
        throw HttpError(409, "Email in use")
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email)
    const verificationCode = nanoid();
    const newUser = await User.create({
        ...req.body,
        password: hashPassword,
        avatarURL,
        verificationCode
    });
    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${verificationCode}">Click verify email</a>`
    }

    await sendEmail(verifyEmail)

    res.status(201).json({
        user: {
            name: newUser.name,
            email: newUser.email,
            avatarURL: newUser.avatarURL,
            subscription: newUser.subscription,
        } 
    })
}

const verify = async(req, res)=> {
    const {verificationCode} = req.params;
    const user = await User.findOne({verificationCode});
    if(!user) {
        throw HttpError(404);
    }

    await User.findByIdAndUpdate(user._id, {verify: true, verificationCode: ""});

    res.json({
        mesage: "Verify email success"
    })
}

const resendVerifyEmail = async(req, res) => {
    const {email} = req.body;
    const user = await User.findOne({email});
    if(!user || user.verify){
        throw HttpError(404);
    }

    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationCode}">Click verify email</a>`
    }

    await sendEmail(verifyEmail);

    res.json({
        message: "Verify email resend success"
    })
}

const login = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});
    if(!user) {
        throw HttpError(401, "Email or password invalid"); 
    }

     if(!user.verify) {
        throw HttpError(400, "Email not verify");
    } 

    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare) {
        throw HttpError(401, "Email or password invalid"); 
    }

    const payload = {
        id: user._id,
    }

    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
        user: {
            name: user.name,
            email: user.email,
            subscription: user.subscription,
            avatarUrl: user.avatarURL,
        },
    })
}

const getCurrent = async (req, res) => { 
    const { name, email, subscription, avatarURL } = req.user;
    res.json({ user: { name, email, subscription, avatarURL } });
}

const logout = async (req, res) => { 
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: '' })
    res.json(204).end();
}

const updateSubscription = async (req, res) => { 
    const { _id } = req.user;

    const result = await User.findByIdAndUpdate(_id, req.body, { new: true });
    
    if (!result) {
    throw HttpError(404, 'Not Found' )
    }

    res.json(result);
}

const avatarsDir = path.join(__dirname, "../", "public", "avatars")

const updateAvatar = async(req, res)=> {
    const {_id} = req.user;
    const {path: tempUpload, originalname} = req.file;
    const filename = `${_id}_${originalname}`;
    const resultUpload = path.join(avatarsDir, filename)
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename)
    const user = await User.findByIdAndUpdate(_id, {avatarURL}, { new: true })

    res.json({
        user: {
            email: user.email,
            subscription: user.subscription,
            avatarUrl: user.avatarURL,
        },
    })
}


module.exports = {
    register: ctrlWrapper(register),
    verify: ctrlWrapper(verify),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar),
}   