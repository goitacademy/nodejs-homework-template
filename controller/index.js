const service = require("../service");
const Joi = require("joi");
const User = require("../service/schemas/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const secret = process.env.JWT_SECRET;
const gravatar = require("gravatar");
const path = require("path");
const Jimp = require("jimp");
const fs = require("fs").promises;

const contactSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  phone: Joi.string().min(14).max(20).required(),
  favorite: Joi.boolean(),
});

const get = async (req, res, next) => {
  try {
    const results = await service.getAllContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts: results,
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const result = await service.getContactById(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const create = async (req, res, next) => {
  const { _id } = req.user;
  const { name, email, phone } = req.body;
  const { error } = contactSchema.validate({ name, email, phone });
  if (error) return res.status(400).json({ message: error });
  try {
    const result = await service.createContact({
      name,
      email,
      phone,
      owner: _id,
    });
    res.status(201).json({
      status: "success",
      code: 201,
      data: { contact: result },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const update = async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  const { error } = contactSchema.validate({ name, email, phone });
  if (error) return res.status(400).json({ message: "missing required field" });
  try {
    const result = await service.updateContact(contactId, {
      name,
      email,
      phone,
    });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite = false } = req.body;
  const { error } = contactSchema.validate({ favorite });
  if (error) return res.status(400).json({ message: "missing field favorite" });
  try {
    const result = await service.updateContact(contactId, { favorite });
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const remove = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const result = await service.removeContact(contactId);
    if (result) {
      res.json({
        status: "success",
        code: 200,
        data: { contact: result },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Not found contact id: ${contactId}`,
        data: "Not Found",
      });
    }
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const userSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
});

const createUser = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = userSchema.validate({ email, password });
  if (error)
    return res.status(400).json({ message: "Incorrect login or password" });
  const user = await service.checkUser(email);
  if (user) {
    return res.status(409).json({
      status: "error",
      code: 409,
      message: "Email is already in use",
      data: "Conflict",
    });
  }
  try {
    const newUser = new User({ email, avatarURL: gravatar.url(email) });
    newUser.setPassword(password);
    await newUser.save();
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        message: "Registration successful",
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const { error } = userSchema.validate({ email, password });
  if (error)
    return res.status(400).json({ message: "Incorrect login or password" });
  const user = await service.checkUser(email);

  if (!user || !user.validPassword(password)) {
    return res.status(400).json({
      status: "error",
      code: 401,
      message: "Email or password is wrong",
      data: "Unauthorized",
    });
  }

  const payload = {
    id: user._id,
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1h" });
  user.token = token;
  user.save();
  res.json({
    status: "success",
    code: 200,
    data: {
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    },
  });
};

const logout = async (req, res, next) => {
  const { _id } = req.user;
  try {
    await service.removeToken(_id, { token: "" });
    res.json({
      status: "success",
      code: 204,
      data: "No Content",
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const getUser = async (req, res, next) => {
  const { email } = req.user;
  try {
    const user = await service.getUser(email);
    res.json({
      status: "success",
      code: 200,
      data: {
        user: {
          email: user.email,
          subscription: user.subscription,
        },
      },
    });
  } catch (e) {
    console.error(e);
    next(e);
  }
};

const IMAGE_DIR = path.join(process.cwd(), "public", "avatars");

const updateAvatar = async (req, res, next) => {
  const { _id } = req.user;
  const { path: temporaryName, originalname } = req.file;
  const image = await Jimp.read(temporaryName);
  image.resize(250, 250);
  await image.writeAsync(temporaryName);
  const targetFileName = path.join(IMAGE_DIR, [_id, originalname].join("_"));
  try {
    await fs.rename(temporaryName, targetFileName);
    const newURL = await service.updateAvatar(_id, {
      avatarURL: targetFileName,
    });
    res.json({ avatarURL: newURL, status: 200 });
  } catch (err) {
    await fs.unlink(temporaryName);
    return next(err);
  }
};

module.exports = {
  get,
  getById,
  create,
  update,
  updateStatusContact,
  remove,
  createUser,
  login,
  logout,
  getUser,
  updateAvatar,
};
