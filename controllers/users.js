const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const {
  findOne,
  findOneAndUpdate,
  create,
} = require("../models/functionsUsers");

const { SECRET_KEY } = process.env;

const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
});

const crtlRegisterUser = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ message: "Помилка від Joi або іншої бібліотеки валідації" });
  }
  const { password, email } = req.body;
  const isEmail = await findOne(email);
  if (isEmail) {
    return res.status(409).send({ message: "Email in use" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await create({
    email,
    password: hashPassword,
  });

  res.status(201).send({
    user: {
      email: email,
      subscription: newUser.subscription,
    },
  });
};

const crtlLoginUser = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ message: "Помилка від Joi або іншої бібліотеки валідації" });
  }
  const { password, email } = req.body;

  const validEmail = await findOne(email);
  if (!validEmail) {
    return res.status(400).send({ message: "Email or password is wrong" });
  }

  const validPassword = bcrypt.compare(password, validEmail.password);
  if (!validPassword) {
    return res.status(400).send({ message: "Email or password is wrong" });
  }
  const token = jwt.sign({ id: validEmail._id }, SECRET_KEY, {
    expiresIn: "7d",
  });
  await findOneAndUpdate({ email }, { token });

  res.status(200).send({
    token: token,
    user: {
      email: validEmail.email,
      subscription: validEmail.subscription,
    },
  });
};

const ctrlLogoutUser = async (req, res) => {
  findOneAndUpdate({ _id: req.user._id }, { token: "" });
  res.status(204).json();
};

const ctrlCurrentUser = async (req, res) => {
  res.status(200).send({
    email: req.user.email,
    subscription: req.user.subscription,
  });
};

module.exports = {
  crtlRegisterUser,
  crtlLoginUser,
  ctrlLogoutUser,
  ctrlCurrentUser,
};
