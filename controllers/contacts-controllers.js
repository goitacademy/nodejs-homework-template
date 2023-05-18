const { HttpError } = require("../helpers/index");
const { Contact } = require("../models/contact");
const { ctrlWrapper } = require("../utils");

const getAllContacts = async (req, res, next) => {
  const result = await Contact.find();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findById(id);
  console.log(result);
  if (!result) {
    throw HttpError(404);
  }

  res.json(result);
};

const addContact = async (req, res) => {
  const result = await Contact.create(req.body);
  res.status(201).json(result);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404);
  }
  res.status(204).send();
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const updateFavoritContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  addContact: ctrlWrapper(addContact),
  getContactById: ctrlWrapper(getContactById),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
  updateFavoritContact: ctrlWrapper(updateFavoritContact),
};
