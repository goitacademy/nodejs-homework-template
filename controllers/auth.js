const { User } = require("../models/user");
const ctrlWrapper = require("../helpers/ctrlWrapper");
const HttpError = require("../helpers/HttpError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { id } = require("@hapi/joi/lib/base");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
const { json } = require("express");

require("dotenv").config();


const avatarsDir = path.join(__dirname, "../", "public", "avatars")

const { SECRET_KEY } = process.env;

const payload = {
    id: "63fe4a5a68b27c947e28495b"
}


const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
console.log(token);
const decodeToken = jwt.decode(token);
console.log(decodeToken);

// try {
//     const {id} = jwt.verify(token, SECRET_KEY);
//     console.log(id);
//     const invalidToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OGRjMTg0NjkzMGQ2NWMwODU2ZTA4OCIsImlhdCI6MTcwMzc5MzUwNCwiZXhwIjoxNzAzODc2MzA0fQ.T3aLm5MP1bM6GAsctEHyem0XBgg2-qKq3ypzH3vDg0w";
//     const result = jwt.verify(invalidToken, SECRET_KEY);
//     console.log(result);
// } catch (error) {
//     console.log(error.message);  
// }

const register = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
        throw HttpError(409, "Email in use");
    }

    const hashPassword = await bcrypt.hash(password, 6);
    const avatarURL = gravatar.url(email);

    const newUser = await User.create( {...req.body, password: hashPassword, avatarURL} );
    
    res.status(201).json({
        email: newUser.email,
    })
}


const login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if (!passwordCompare) {
             throw HttpError(401, "Email or password is wrong");   
    }
    

    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(user._id, {token})
    res.json({
        token,
    })

}

const getCurrent = async (req, res) => {
    const { email, name } = req.user;
    res.json({
        email,
        name,
    })
}

const logout = async (req, res) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });
    res.json({
        message: "Logout success"
    })

}

const updateAvatar = async (req, res) => {
    const {_id} = req.user;
  const {path: tempUpload, originalname} = req.file;
  const filename = `${_id}_${originalname}`;
  const resultUpload = path.join(avatarsDir, filename);
  await fs.rename(tempUpload, resultUpload);
  const avatarURL = path.join("avatars", filename);
  await User.findByIdAndUpdate(_id, { avatarURL });
  res.json({
    avatarURL,
  })
}


module.exports = {
    register: ctrlWrapper(register),
    login: ctrlWrapper(login), 
    getCurrent: ctrlWrapper(getCurrent),
    logout: ctrlWrapper(logout),
    updateAvatar: ctrlWrapper(updateAvatar),
}
