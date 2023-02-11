const { Contact } = require("../models/contacts");

const { controllerWrapper, HttpError } = require("../helpers");

const listContacts = async (req, res) => {
  const result = await Contact.find({});
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findOne({ _id: id });
  if (!result) {
    throw HttpError(400, `Contact with ${id} does not exist`);
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await Contact.findByIdAndRemove({ _id: id });
  if (!result) {
    throw HttpError(404, `Book with ${id} not found`);
  }
  res.json({ message: "Contact deleted successfully" });
};

const addContact = async (req, res) => {
  const { body } = req;
  const result = await Contact.create(body);

  res.status(201).json(result);
};
const updateContact = async (req, res) => {
  const { body } = req;
  const { id } = req.params;
  const result = await Contact.findByIdAndUpdate({ _id: id }, body);
  if (!result) {
    throw HttpError(404, `Book with ${id} not found`);
  }
  res.json(result);
};

module.exports = {
  listContacts: controllerWrapper(listContacts),
  getContactById: controllerWrapper(getContactById),
  removeContact: controllerWrapper(removeContact),
  addContact: controllerWrapper(addContact),
  updateContact: controllerWrapper(updateContact),
};
