const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res, next) => {
  const contactsList = await Contact.find();
  res.json(contactsList);
};

const getById = async (req, res, next) => {
  const contact = await Contact.findById(req.params.contactId);
  if (!contact) {
    throw HttpError(404);
  }
  res.json(contact);
};

const add = async (req, res, next) => {
  const contact = await Contact.create(req.body);
  res.status(201).json(contact);
};

const updateById = async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  res.status(200).json(contact);
};

const deleteById = async (req, res, next) => {
  const contact = await Contact.findByIdAndRemove(req.params.contactId);
  if (!contact) {
    throw HttpError(404);
  }
  res.status(200).json({ message: "Contact deleted" });
};

const updateFavorite = async (req, res, next) => {
  const contact = await Contact.findByIdAndUpdate(
    req.params.contactId,
    req.body,
    { new: true }
  );
  res.status(200).json(contact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
