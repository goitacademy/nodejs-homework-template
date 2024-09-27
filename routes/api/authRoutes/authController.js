const bcrypt = require("bcrypt");
const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const gravatar = require("gravatar");
const path = require("path");
const fs = require("fs/promises");
require("dotenv").config();
const jimp = require("jimp");
const {nanoid} = require('nanoid')



const User = require("../../../models/userModel");
const { HttpError } = require("../../../onError");
const { sendEmail } = require("../../../helpers");
const { SECRET_KEY } = process.env;
const storeImage = path.resolve("public", "avatars");

class AuthController {
  userRegister = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({
        status: "error",
        code: 409,
        message: "Email is already in use",
        data: "Conflict",
      });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const avatar = await gravatar.url(email, { s: "200" });
    const verificationCode = await nanoid()
    try {
      const newUser = await User.create({
        ...req.body,
        avatarURL: avatar,
        password: hashPassword,
        verificationCode,
      });
      
      const verifyData = {
        to: newUser.email,
        subject: "Please, confirm your email",
        html: `<p>Please, confirm your email ${newUser.email} by click on <a href="localhost:60000/api/v1/users/verify/${newUser.verificationCode}">this link</a></p>`,
      };
      sendEmail(verifyData);
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          message: "Registration successful",
          email: newUser.email,
          avatarURL: newUser.avatarURL,
        },
      });
    } catch (error) {
      next(error);
    }
  });

  userVerification = asyncHandler(async (req, res, next) => {
    const { verificationCode } = req.params;
   
    const user = await User.findOne({ verificationCode: verificationCode })
    if (!user) {
      throw HttpError(401)
    }
   
    await User.findByIdAndUpdate(user._id, {isValidated: true, verificationCode: ""})
    return res.json({
      message: "Verification success",
    })
  })
  userResendVerification = asyncHandler(async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      throw HttpError(401, "No such user")
    }
  
    try {
      const verifyData = {
        to: user.email,
        subject: "Please, confirm your email",
        html: `<p>Please, confirm your email ${user.email} by click on <a href="localhost:60000/api/v1/users/verify/${user.verificationCode}">this link</a></p>`,
      };
      sendEmail(verifyData);
       return res.json({
      message: "Verification code was sent successfully",
    })
    } catch (error) {
      next(error);
    }

})
  userLogin = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
  
    if (!user) {
      throw HttpError(401);
    }
      if (!user.isValidated) {
      throw HttpError(401, "Validate your email")
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    
    if (!checkPassword) {
      throw HttpError(401);
    }
    const { id } = user;
    const payload = { id: user._id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });
    await User.findByIdAndUpdate(id, { token });
    res.json({
      token,
    });
  });

  userLogout = asyncHandler(async (req, res, next) => {
    const { _id } = req.user;
    await User.findByIdAndUpdate(_id, { token: "" });

    res.json({
      message: "Logout success",
    });
  });

  userCurrent = asyncHandler(async (req, res, next) => {
    const { email, subscription } = req.user;

    res.json({
      email,
      subscription,
    });
  });

  updateAvatar = asyncHandler(async (req, res) => {
    const { _id } = req.user;
    const { path: temporaryName, filename: newFileName } = req.file;

    const fileName = path.join(storeImage, newFileName);

    try {
      const img = await jimp.read(temporaryName);
      await img
        .autocrop()
        .cover(250, 250, jimp.HORIZONTAL_ALIGN_CENTER)
        .writeAsync(temporaryName);
      await fs.rename(temporaryName, fileName);
      await User.findByIdAndUpdate(_id, { avatarURL: fileName });
      res.status(200);
      res.json(`avatar changed to ${fileName}`);
    } catch (error) {
      fs.unlink(temporaryName);
      next(error);
    }
  });
}

module.exports = new AuthController();
