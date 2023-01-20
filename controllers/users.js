const express = require("express");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const gravatar = require("gravatar");
const Jimp = require("jimp");
const fs = require("fs/promises");
const {
  findOne,
  findOneAndUpdate,
  create,
} = require("../models/functionsUsers");
const User = require("../models/users");

const { SECRET_KEY, PORT } = process.env;


const schema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: Joi.string().required(),
});

const uploadAndPatchAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path, filename } = req.file;
  const avatarUrlPath = `/avatars/${req.user._id}_${filename}`;
  Jimp.read(req.file.path)
    .then((result) => {
      return result
        .resize(250, 250) // resize
        .write(`./public/${avatarUrlPath}`); // save
    })
    .catch((err) => {
      console.error(err);
    });
  await fs.unlink(path);
  await User.findByIdAndUpdate(_id, { avatarURL: avatarUrlPath });
  res.send({avatarURL: `http://localhost:${PORT}${avatarUrlPath}`});
};

const crtlRegisterUser = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res
      .status(400)
      .send({ message: "Помилка від Joi або іншої бібліотеки валідації" });
  }
  const { password, email } = req.body;
  const resultUrl = gravatar.url(email);

  const isEmail = await findOne(email);
  if (isEmail) {
    return res.status(409).send({ message: "Email in use" });
  }
  const hashPassword = await bcrypt.hash(password, 10);
  const newUser = await create({
    email,
    password: hashPassword,
    avatarURL: resultUrl,
  });

  res.status(201).send({
    user: {
      email: email,
      subscription: newUser.subscription,
      avatarURL: resultUrl,
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
  uploadAndPatchAvatar,
};
