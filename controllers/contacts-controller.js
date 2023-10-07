const HttpError = require("../helpers/HttpError");

const { Contact } = require("../models/Contact");

const ctrlWrapper = require("../decorators/ctrlWrapper");

const getAll = async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById({ id });

  if (!contact) {
    throw HttpError(404, `Contact with ${id} is not found`);
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  console.log("Inside add function", req.body);

  const { name, email, phone } = req.body;

  const newContact = await Contact.create({ name, email, phone });
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

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
