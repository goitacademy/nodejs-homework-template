const { Contact } = require("../models/contact");

const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const contacts = await Contact.find({}, "-createdAt -updatedAt");
  console.log(req.params);
  res.json(contacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log(req.params);
  const contact = await Contact.findById(contactId);
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
  const { contactId } = req.params;
  const removedContact = await Contact.findByIdAndDelete(contactId);
  if (!removedContact) {
    throw HttpError(400, "Not found");
  }
  res.status(200).json(removedContact);
};

const updateById = async (req, res) => {
  const { contactId } = req.params;
  const editContact = await Contact.findByIdAndUpdate(contactId, req.body);
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
};
