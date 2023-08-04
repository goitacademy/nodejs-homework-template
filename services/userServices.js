const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');

const path = require('path');
const fs = require('fs/promises');

const gravatar = require('gravatar');

const {User} = require("../models/user");

const HttpError = require("../utils/HttpError");

require('dotenv').config();

const {SECRET_KEY} = process.env;

const avatarsDir = path.join(process.cwd(), "../", "public", "avatars");


const register = async (data) => {
  const { email, password } = data.body;
  const user = await User.findOne({email});

  if (user) {
    throw HttpError(409, "Email in use");
  }
  
  const hashedPassword = await bcrypt.hash(password, 10);
  const avatarURL = gravatar.url(email, {d: 'wavatar'}, true);

  const newUser = await User.create({ ...data.body, password: hashedPassword, avatarURL });

  return newUser;
};

const login = async(data) => {
  const { email, password } = data.body;
    const user = await User.findOne({ email });

    const comparedPassword = await bcrypt.compare(password, user.password);

    if (!user || !comparedPassword) {
        throw HttpError(401, "Email or password is wrong");
      };

      const payload = {
        id: user._id
    };
    
    const token = jwt.sign(payload, SECRET_KEY, {expiresIn: "12h"});
    await User.findByIdAndUpdate(user._id, {token});
    return token;
};

const logout = async(data) => {
    const {_id} = data.user;
    const result = await User.findByIdAndUpdate(_id, {token: null});

    return result;
};

const updateUserAvatar = async(data) => {
  const {avatarURL, _id} = data.user;    

    const {path: tempDirUpload} = data.file;

    const finalUpload = path.join(avatarsDir, `${_id}.jpg`);

    
    // ПЕРЕМЕСТИТЬ СНАЧАЛА В ПАПКУ ТЕМП, ЗАТЕМ JIMP, А ПОСЛЕ УЖЕ В НОВУЮ. ИЗМЕНИТЬ СНАЧАЛА НУЖНО ПУТЬ avatarsDir на tmp , ЗАТЕМ ЧЕРЕЗ ASYNC JIMP УЖЕ В НОВУЮ
}

module.exports = {
  register,
  login,
  logout,
  updateUserAvatar,
};
