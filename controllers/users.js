const {User} = require('../models/user');
const HttpError = require('../helpers/HttpError');
const {ctrlWrapper} = require('../helpers/ctrWrapper');
const sendEmail = require('../helpers/sendEmail');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const path = require('path');
const fs = require('fs/promises');
const jimp = require('jimp');
const {nanoid} = require('nanoid');

require('dotenv').config();

const {SECRET_KEY, BASE_URL} = process.env;

const avatarsDir = path.join(__dirname, '../', 'public', 'avatars');

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});

    if(user){
        throw HttpError(409, "Email in use")
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);
    const verificationToken = nanoid();

    const newUser = await User.create({
        ...req.body, 
        password:hashPassword, 
        avatarURL, 
        verificationToken
    });

    const verifyEmail = {
        to: email, 
        subject: 'Verefy email',
        html:`<a target = "_blank" href="${BASE_URL}/api/users/verify/${verificationToken}"> click verify email</a>`
    };
   
    await sendEmail(verifyEmail);

    res.status(201).json(
     {
        user: {
            email: newUser.email,
            subscription: newUser.subscription,
        }
     });
}

const verifyEmail = async (req, res) => {
    const { verificationToken } = req.params;
    const user = await User.findOne({ verificationToken });
  
    if (!user) {
        throw HttpError(404, 'User Not Found')
    }
    await User.findByIdAndUpdate(user._id, {
      verify: true,
      verificationToken: null,
    });
  
    res.json({
        message: 'Verification successful',
    });
  };
  
  const resendVerifyEmail = async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
        throw HttpError(401, 'Email not found');
    }
  
    if (user.verify) {
        throw HttpError(400, 'Verification has already been passed');
    }
  
    const verifyEmail = {
    to: email,
    subject: "Verify email",
    html: `<a target="_blank" href="${BASE_URL}/api/auth/verify/${user.verificationToken}">Click verify email</a>`
}

await sendEmail(verifyEmail);
  
    res.json({
      message: 'Verification email sent',
    });
  };

const login = async (req, res) => {
   const {email, password} = req.body;
   const user = await User.findOne({email});
if(!user){
    throw HttpError(401, "Email or password is wrong");
}
if(!user.verify){
    throw HttpError(401, 'Email not verified');
}

const passwordCompare = await bcrypt.compare(password, user.password);
  
if(!passwordCompare){
    throw HttpError (401, "Email or password is wrong");
}

const payload = {
    id: user._id,
}
const token = await jwt.sign(payload, SECRET_KEY, {expiresIn: '1h'});
await User.findByIdAndUpdate(user._id, {token});
res.json({
        token,
        user: {
          email:user.email,
          subscription:user.subscription
        }
})
}

const getCurrent = async (req, res, next) => {
        const user = req.user;
        const {token}  = req.params;
        if (user.token !== token) {
            throw HttpError(401, "Not authorized");
        }

        res.json({
            email: user.email,
            subscription: user.subscription
        })
   
}

// const verifyEmail = async ( req, res) => {
// const {verificationCode} = req.params;
// const user = await User.findOne({verificationCode})
// if(!user){
//     throw HttpError(401, 'Email not found')
// }
// await User.findByIdAndUpdate(user._id,{verify: true, verificationCode: ' '});

// res.json({
//     message: 'Email verify success'
// })
// }

const logout = async (req, res) => {
    const{id} = req.user;
   await User.findByIdAndUpdate(id, {token:" "});
     
    res.status(204).json(
        {message: 'Logout success'}
    )
}

const subscription = async (req, res) => {
    const{id} = req.params;
    const result = await User.findByIdAndUpdate(id, req.body, {new: true});
    if(!result){
     throw HttpError(400);
    }
    res.json(result);
}

const updateAvatar = async (req, res) => {
    const {path:tempUpload, originalname} = req.file;
    const {_id} = req.user;

    const resizeAvatar = await jimp.read(tempUpload);
    resizeAvatar
    .resize(250, 250, jimp.RESIZE_BEZIER)
    .write(tempUpload);

    const filename = `${_id}_${originalname}`;
    const restltUpload = path.join(avatarsDir, filename);
    await fs.rename (tempUpload, restltUpload);
    const avatarURL = path.join('avatars', filename);
    await User.findByIdAndUpdate(_id, {avatarURL});

    res.json({
        avatarURL,
    })

}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    subscription: ctrlWrapper(subscription),
    updateAvatar: ctrlWrapper(updateAvatar),
    verifyEmail: ctrlWrapper(verifyEmail),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
}