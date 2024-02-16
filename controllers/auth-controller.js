import HttpError from '../helpers/index.js';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import ctrlWrapper from '../decorators/ctrlWrappers.js';
import  jwt  from 'jsonwebtoken';
import gravatar from "gravatar";
import Jimp from 'jimp';
import sendEmail from '../helpers/sendEmail.js';
import { nanoid } from 'nanoid';
// const  { JWT_SECRET} = process.env



function generateAvatar(email) {
    const avatarURL = gravatar.url(email, {
        s: "200",
        r: "g",
        d: "identicon",
    });


    return avatarURL;
}





const signUp = async (req, res) => {

    const {email, password} = req.body;

    const url = generateAvatar(email);
    
    console.log(req.params);

    const user = await User.findOne({email});

    if (user){
        throw HttpError (409, `${email} already in use`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const verificationCode = nanoid()
    const newUser = await User.create({...req.body, password: hashPassword, verificationCode: verificationCode});
    
    
    
    const verifyEmail = {
        to: email,
        subject: "Verification Code",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${verificationCode}">click to verify email</a>`
    }

    await sendEmail(verifyEmail)

    res.status(201).json({
        email: newUser.email,
        username: newUser.username,
        avatarURL: url,

    })
};

const signIn = async(req, res) => {
    const {email, password} = req.body;

    const user = await User.findOne({email});

    if(!user){
        throw HttpError(401, "Email or password is wrong");
    }

    if(!user.verify){
        throw HttpError(401, "Email is not verify")
    }


    const passwordCompare = await bcrypt.compare(password, user.password);

    if(!passwordCompare){
        throw HttpError(401, "Email or password is wrong");
    }


    const payload = {
        id: user._id,

    }
    
    
    const token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "23h"});
    await User.findByIdAndUpdate(user._id, {token});
    res.json({
    token,
    email,
    password
    })
}

const getCurrent = async (req, res) => {
    const {username, email} = req.user 


    res.json({
        username, 
        email
    })
}

const signOut = async (req, res) => {
    const {_id} = req.user
    await User.findByIdAndUpdate(_id, {token: ''}) 
    

    res.status(204).json()
}




const updateAvatar = async (req, res, next) => {
    const { path: tempPath, originalname } = req.file;
  
    // Обробка аватарки з використанням Jimp
    
    // Оновлення поля avatarURL користувача та збереження в базу даних
    const avatarURL = `/avatars/${originalname}`;
    // Отримайте ідентифікатор користувача, наприклад, з токену
    const { contactId } = req.params;
    console.log(contactId);

    try {
      // Оновіть поле avatarURL для користувача в базі даних
      const image = await Jimp.read(tempPath)
       await image.resize(250, 250).write(`public/avatar/${originalname}`)
      

      await User.findByIdAndUpdate(contactId, { avatarURL });
      res.json({ avatarURL });
    } catch (error) {
      console.error("Error updating avatarURL:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

  const resendVerifyEmail = async (req, res) => {
    const {email} = req.body;
    const user = await User.findOne({ email });

    if (!user) {
        throw HttpError(404, 'Email is not found');

    }

    if (user.verify){
        HttpError(400, 'Email already verify')
    }


    const verifyEmail = {
        to: email,
        subject: "Verification Code",
        html: `<a target="_blank" href="http://localhost:3000/api/users/verify/${user.verificationCode}">click to verify email</a>`
    }

    await sendEmail(verifyEmail)

    res.json({
        message: 'Verify Email send'
    })
  }

  const verify = async (req, res) => {
    const { verificationCode } = req.params;
    
  const user = await User.findOne({ verificationCode });

  if (!user) {
    throw HttpError(404);
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationCode: "",
  });

  res.json({
    message: "Verify success",
  });
}


export default {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    verify: ctrlWrapper(verify),
    getCurrent: ctrlWrapper(getCurrent),
    resendVerifyEmail: ctrlWrapper(resendVerifyEmail),
    signout: ctrlWrapper(signOut),
    updateAvatar: ctrlWrapper(updateAvatar)
}
