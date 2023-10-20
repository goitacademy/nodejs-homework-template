const fs = require("fs/promises");
const path = require("path");

const HttpError = require("../helpers/HttpError");
const { Contact } = require("../models/Contact");

const ctrlWrapper = require("../decorators/ctrlWrapper");

const avatarPath = path.resolve("public", "avatars");

const getAll = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 10 } = req.query;
  const skip = (page - 1) * limit;

  const contacts = await Contact.find({ owner })
    .skip(skip)
    .limit(parseInt(limit))
    .populate("owner", "email");

  res.json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;

  console.log("Contact ID:", id);
  const contact = await Contact.findById(id);

  if (!contact) {
    throw HttpError(404, `Contact with ${id} is not found`);
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { _id: owner } = req.user;
  const { path: oldPath, filename } = req.file;
  const newPath = path.join(avatarPath, filename);
  await fs.rename(oldPath, newPath);

  const avatar = path.join("avatars", filename);
  const { name, email, phone } = req.body;
  const newContact = await Contact.create({
    name,
    email,
    phone,
    avatar,
    owner,
  });
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await Contact.findByIdAndDelete(id);
  if (!deletedContact) {
    throw HttpError(404, `Contact with ${id} is not found`);
  }

  res.status(200).json({ data: deletedContact });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedContacts = await Contact.findByIdAndUpdate(id, body);
  if (!updatedContacts) {
    throw HttpError(404, `Contact with ${id} is not found`);
  }
  res.status(200).json(updatedContacts);
};

const updateFavoriteStatus = async (req, res) => {
  const { id } = req.params;
  const { favorite } = req.body;

  const updatedContact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (!updatedContact) {
    throw HttpError(404, `Contact with ${id} is not found`);
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavoriteStatus: ctrlWrapper(updateFavoriteStatus),
};
