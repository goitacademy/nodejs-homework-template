const Joi = require('joi');
const createError = require('http-errors');

const {
    registration,
    login,
    currentUser,
    logout
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

const logoutController = async (req, res) => {
  const { _id } = req.user;
  await logout(_id);
  res.status(204).json({status: "204 No Content"});
 };

module.exports = {
    registrationController,
    loginController,
    currentUserController,
    logoutController
}