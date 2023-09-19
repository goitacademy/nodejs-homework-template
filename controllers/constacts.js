// const {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// } = require("../models/contacts");
const Book = require("../models/contact");
const { HttpError, ctrlWrapper } = require("..//utils/index");

const { contactSchema } = require("../validators/validate");

const getAll = async (req, res) => {
  const contacts = await Book.find();
  res.status(200).json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Book.findOne({ _id: id });
  if (!contact) {
    throw HttpError(404, "Contact not found");
  }

  res.status(200).json(contact);
};

const add = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, `missing required ${error.details[0].path[0]} field`);
  }

  const newContact = await Book.create(req.body);
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await Book.findByIdAndDelete(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateById = async (req, res) => {
  if (Object.keys(req.body).length < 2) {
    return res.status(400).json({ message: `missing fields` });
  }

  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, `missing required ${error.details[0].path[0]} field`);
  }
  const { id } = req.params;
  const updatedContact = await Book.findByIdAndUpdate(id, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

const updateFavorite = async (req, res) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    throw HttpError(400, `missing required ${error.details[0].path[0]} field`);
  }
  const { id } = req.params;
  const updatedContact = await Book.findByIdAndUpdate(id, req.body);
  if (!updatedContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(updatedContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
