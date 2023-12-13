const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findOne({ _id: id });
  if (!contact) {
    throw HttpError(404, "Not found");
  }
  res.json(contact);
};

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const id = req.params.id;
  const removedContact = await Contact.findByIdAndDelete(id);
  if (!removedContact) {
    throw HttpError(400, "Not found");
  }
  res.status(200).json(removedContact);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const editContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!editContact) {
    throw HttpError(404, "Not found");
  }
  res.json(editContact);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const editContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!editContact) {
    throw HttpError(404, "Not found");
  }
  res.json(editContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
