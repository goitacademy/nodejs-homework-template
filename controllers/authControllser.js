const Joi = require('joi');
const createError = require('http-errors');
const Jimp = require('jimp');
const path = require('path');
const fs = require('fs');

const {
    registration,
    login,
    logout,
    currentUser,
    setUserAvatar,
} = require('../services/authService');

const validateBody = (body) => {
  const schema = Joi.object({
    password: Joi.string()
      .required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
      .required(),
    subscription: Joi.string(),
  })
  return schema.validate(body);
}

const registrationController = async (req, res) => {
  if (validateBody(req.body).error) {
    throw createError(400, validateBody(req.body).error);
  }
  const { email, password, subscription } = req.body;
  await registration(email, password, subscription);
  res.status(201).json({
    status: "201 Created",
    ResponseBody: {
      user: {
        email: email,
        subscription: subscription || "starter"
      }
  }})
};
 
const loginController = async (req, res) => {
  if (validateBody(req.body).error) {
    throw createError(400, validateBody(req.body).error);
  }
  const { email, password } = req.body;
  const { token, subscription } = await login(email, password);
  res.status(200).json({
    status: "200 OK",
    ResponseBody: {
      token: token,
      user: {
        email: email,
        subscription: subscription || "starter"
      }
  }})
};

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.status(204).json({status: "204 No Content"});
};
 
const currentUserController = async (req, res) => {
  const { _id } = req.user;
  const { email, subscription } = await currentUser(_id);
  res.status(200).json({
    status: "200 OK",
    ResponseBody: {
      user: {
        email: email,
        subscription: subscription || "starter"
      }
  }})
 };

const avatarUserController = async (req, res) => {
  const { base: fileName } = path.parse(req.urlTmp);
  let avatarURL = path.resolve('./public/avatars/', fileName);
  Jimp.read(req.urlTmp, (err, avatar) => {
      if (err) throw err;
      avatar
          .resize(250, 250)
          .write(avatarURL);
  });
  fs.unlinkSync(req.urlTmp);
  const { _id } = req.user;
  avatarURL = path.relative('./public', avatarURL);
  await setUserAvatar(_id, avatarURL);
  res.status(200).json({
    status: "200 OK",
    ResponseBody: {
      avatarURL: avatarURL
  }})
 };

module.exports = {
  registrationController,
  loginController,
  logoutController,
  currentUserController,
  avatarUserController,
}