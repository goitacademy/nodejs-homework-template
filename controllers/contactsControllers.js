const Contact = require("../models/contactsModel");
const { HttpError } = require("../helpers");
const { ctrlWrapper } = require("../decorators");

const allContacts = async (req, res) => {
  const { _id: owner } = req.user;
  const { page = 1, limit = 20, favorite } = req.query;
  const skip = (page - 1) * limit;
  const query = { owner };

  if (favorite && favorite.toLowerCase() === "true") {
    query.favorite = true;
  }
  const result = await Contact.find(query, "-createdAt -updatedAt", {
    skip,
    limit,
  }).populate("owner", "name email");
  res.json(result);
};

const oneContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  if (!result) {
    throw HttpError(404, `Contact not found`);
  }
  res.json(result);
};

const add = async (req, res) => {
  const {_id: owner} = req.user;
  const result = await Contact.create({...req.body, owner});
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, `Contact not found`);
  }
  res.json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, favorite } = req.body;
  //
  const updatedFields = {};
  if (name) {
    updatedFields.name = name;
  }
  if (email) {
    updatedFields.email = email;
  }
  if (phone) {
    updatedFields.phone = phone;
  }
  if (favorite) {
    updatedFields.favorite = favorite;
  }

  const result = await Contact.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, `Contact not found`);
  }
  res.json(result);
};

const updateStatusContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, `Contact not found`);
  }
  res.json(result);
};

module.exports = {
  allContacts: ctrlWrapper(allContacts),
  oneContact: ctrlWrapper(oneContact),
  add: ctrlWrapper(add),
  deleteContact: ctrlWrapper(deleteContact),
  updateStatusContact: ctrlWrapper(updateStatusContact),
  updateById: ctrlWrapper(updateById),
};
