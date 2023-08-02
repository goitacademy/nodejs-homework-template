const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const Jimp = require("jimp");
const fs = require('fs/promises');
const gravatar = require('gravatar');
const {User} = require('../models/user');
const {ctrlWrapper, HttpError} = require('../helpers');
const {SECRET_KEY} = process.env;

const avatarsDir = path.join(__dirname, "../", "public", "avatars");

const register = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (user) {
       throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 10);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create({...req.body, password: hashPassword, avatarURL});

    res.status(201).json({
        user: {
            email: newUser.email,
            subscription: newUser.subscription
          }
    })
}

const login = async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if (!user) {
       throw HttpError(401, "Email or password is wrong");
    }

    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
        throw HttpError(401, "Email or password is wrong");
     }

     const payload = {
        id: user._id
     }

     const token = jwt.sign(payload, SECRET_KEY, {expiresIn: '23h'});
     await User.findByIdAndUpdate(user._id, {token})

     res.status(200).json({
        token,
        user: {
            email: user.email,
            subscription: user.subscription
     }})
}

const getCurrent = async(req, res) => {
    const {email, subscription} = req.user;

    res.status(200).json({email, subscription})
}

const logout = async (req, res) => {
    const {_id} = req.user;
    await User.findByIdAndUpdate(_id, {token: ""});

    res.status(204).json({message: "No Content"});
}

const updateSubscription = async (req, res) => {
    const { _id } = req.user;
    const { subscription } = req.body;

    if (!["starter", "pro", "business"].includes(subscription)) {
      throw HttpError(400, "Invalid subscription. Allowed values: 'starter', 'pro', 'business'");
    }
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      { subscription },
      { new: true } 
    );
  
    res.status(200).json({
      email: updatedUser.email,
      subscription: updatedUser.subscription
    });
  };

const updateAvatar = async (req, res) => {
  const {_id} = req.user;
  const {path: tempUpload, originalname} = req.file;
  const fileName = `${_id}_${originalname}`
  const resultUpload = path.join(avatarsDir, fileName);
  
  await fs.rename(tempUpload, resultUpload);
  
  const avatarURL = path.join("avatars", fileName);
  Jimp.read(resultUpload, (err, img) => {
    if (err) throw err;
    img.resize(250, 250) 
      .write(resultUpload); 
  });

  await User.findByIdAndUpdate(_id, {avatarURL},
    { new: true });

  res.json({
    avatarURL
  })
}

module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login),
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateSubscription: ctrlWrapper(updateSubscription),
    updateAvatar: ctrlWrapper(updateAvatar)
}