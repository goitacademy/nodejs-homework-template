const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//avatar
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const Jimp = require("jimp");
const {nanoid} = require("nanoid");

const {User} = require("../models/user")

const { HttpError,ctrlWrapper,sendEmail } = require("../helpers/");


const { SECRET_KEY, BASE_URL } = process.env;

const avatarDir = path.join(__dirname, "../", "public", "avatars");


const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({email});
  
        if(user){
            throw HttpError(409, "Email in use");
        }

//тимчасова аватарка
    const avatarURL = gravatar.url(email);
//зашифровка пароля
    const hashPassword = await bcrypt.hash(password, 10);
//код підтвердження для вводу емейла
    const verificationToken  = nanoid();

//створення користувача
    const newUser = await User.create({ ...req.body, password: hashPassword , avatarURL, verificationToken});
//створення емейла для підтвердження
    const verifyEmail = {
        to: email,
        subject: "Verify your email",
        html: `<a target="_blanc" href="${BASE_URL}/users/verify/${verificationToken}">Verify your email</a>`,
    };
    await sendEmail(verifyEmail);
  
    res.status(201).json({ 
        user: { 
            email, 
            subscription: newUser.subscription } });
}

const verifyEmail = async(req, res)=> {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
        if (!user) {
            throw HttpError(404, "User not found");
        }
        await User.findByIdAndUpdate(user._id, {
            verify: true,
            verificationToken: null,
        });

    res.status(200).json({
        message: "Verification successful" });
};

const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
        if (!user) {
            throw HttpError(401, "Email or password is wrong");
        }
        if (user.verify) {
            throw HttpError(400, "Verification has already been passed");
        }
    const verifyEmail = {
      to: email,
      subject: "Verify Email",
      html: `<a target="_blanc" href="${BASE_URL}/users/verify/${user.verificationToken}">Click to verify</a>`,
    };
    
        await sendEmail(verifyEmail);

    res.status(200).json({
        message: "Verification email sent" });
  };


const login = async(req, res)=> {
    const {email, password} = req.body;

    const user = await User.findOne({email});
        if(!user){
            throw HttpError(401, "Email or password is wrong");
        }

        if (!user.verify) {
            next(newError(409, "Verify your mail first, please"));
          }


    const passwordCompare = await bcrypt.compare(password, user.password);
        if(!passwordCompare) {
            throw HttpError(401, "Email or password is wrong");
        }
//якщо пароль вірний
     const payload = {
        id: user._id,
     }

    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "23h"});
        await User.findByIdAndUpdate(user._id, {token});

    res.json({
        token,
        user: {
            email,
            subscription: user.subscription
          }
    })
}

const getCurrent = async(req, res)=> {
    const {email, subscription} = req.user;

    res.json({
        email,
        subscription,
    })
}

const logout = async(req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: null});

    res.status(204).json();
}


 //додаткове завдання hw-04 Оновлення підписки (subscription)

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;
    const result = await User.findByIdAndUpdate(
    _id,
      { subscription },
      { new: true, select: "email subscription" }
    );
    if (!result) {
      throw newError(404, "Not found");
    }
    res.status(200).json(result);
  };


//avatar

const updateAvatar = async (req, res) => {
    const { _id } = req.user;
    const { path: tepmUpload, originalname } = req.file;
  
    const img = await Jimp.read(tepmUpload);
    await img.resize(250, 250).writeAsync(tepmUpload);
  
    const filename = `${_id}_${originalname}`; //унікальне імя 
  
    const resultUpload = path.join(avatarDir, filename); //шлях де він має збервгатися
    await fs.rename(tepmUpload, resultUpload); // переміщуємо з тимчасового tepmUpload => resultUpload
  
    const avatarURL = path.join("avatars", filename); // записуємо в базу
    await User.findByIdAndUpdate(_id, { avatarURL });
    
    res.status(200).json({ avatarURL });
};


  module.exports = {
    register:ctrlWrapper(register),
    verifyEmail:ctrlWrapper(verifyEmail),
    resendVerifyEmail:ctrlWrapper(resendVerifyEmail),

    login:ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),

    updateSubscription: ctrlWrapper(updateSubscription),

    updateAvatar: ctrlWrapper(updateAvatar),
  };
