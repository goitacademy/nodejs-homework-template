const { Contact } = require("./shemas/contact");
const gravatar = require("gravatar");
const { User } = require("./shemas/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createHttpError = require("http-errors");
require("dotenv").config();

const { SECRET_KEY } = process.env;
const listContacts = async (id, query) => {
  const { page = 1, limit = 10, favorite } = query;
  const skip = (page - 1) * limit;
  if (favorite) {
    return Contact.find({ id, favorite }, "", {
      skip: skip,
      limit: Number(limit),
    })
      .sort()
      .populate("owner", "_id email ");
  }
  return Contact.find({ id }, "", {
    skip: skip,
    limit: Number(limit),
  }).populate("owner", "_id email ");
};

const getContactById = async (contactId) => {
  return Contact.findOne({ _id: contactId });
};

const addContact = async (body, id) => {
  return Contact.create({ ...body, owner: id });
};
const removeContact = async (contactId) => {
  return Contact.findOneAndDelete({ _id: contactId });
};

const updateContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};
const updateStatusContact = async (contactId, body) => {
  return Contact.findByIdAndUpdate({ _id: contactId }, body, { new: true });
};
const registerUser = async (email, password) => {
  const user = await User.find({ email });
  if (user) {
    throw createHttpError(409, "User already exists.");
  }
  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  const avatarDefault = gravatar.url(email, { s: "256" });
  return await User.create({
    email,
    password: hashPassword,
    avatarURL: avatarDefault,
  });
};
const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  const hashPassword = bcrypt.compareSync(password, user.password);
  if (!user || !hashPassword) {
    return res.status(401).json({
      status: "Error",

      message: "Email or password is wrong",
    });
  }
  const payload = {
    id: user._id,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

  return await User.findByIdAndUpdate(user._id, { token });
};
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
  registerUser,
  loginUser,
};
