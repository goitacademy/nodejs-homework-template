import HttpError from '../helpers/index.js';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import ctrlWrapper from '../decorators/ctrlWrappers.js';
import  jwt  from 'jsonwebtoken';
import gravatar from "gravatar";

// const  { JWT_SECRET} = process.env



const generateAvatar = (email) => {
    const avatarURL = gravatar.url(email, {
      s: "200",
      r: "g",
      d: "identicon",
    });
   
  
    return avatarURL;
  };



const signUp = async (req, res) => {

    const {email, password} = req.body;

    const url = generateAvatar(email);
    

    const user = await User.findOne({email});

    if (user){
        throw HttpError (409, `${email} already in use`);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({...req.body, password: hashPassword});

    
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
  
    try {
      // Оновіть поле avatarURL для користувача в базі даних
      await User.findByIdAndUpdate(contactId, { avatarURL });
      res.json({ avatarURL });
    } catch (error) {
      console.error("Error updating avatarURL:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };

export default {
    signUp: ctrlWrapper(signUp),
    signIn: ctrlWrapper(signIn),
    getCurrent: ctrlWrapper(getCurrent),
    signout: ctrlWrapper(signOut),
    updateAvatar: ctrlWrapper(updateAvatar)
}
