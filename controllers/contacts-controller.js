const contactsService = require("../models/index");
const HttpError = require("../helpers/HttpError");

const ctrlWrapper = require("../decorators/ctrlWrapper");

const getAll = async (req, res) => {
  const contacts = await contactsService.listContacts();
  res.json(contacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);

  if (!contact) {
    throw HttpError(404, `Contact with ${id} is not found`);
  }
  res.status(200).json(contact);
};

const add = async (req, res) => {
  console.log("Inside add function", req.body);

  const { name, email, phone } = req.body;

  const newContact = await contactsService.addContact({ name, email, phone });
  res.status(201).json(newContact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deletedContact = await contactsService.removeContact(id);
  if (!deletedContact) {
    throw HttpError(404, `Contact with ${id} is not found`);
  }

  res.status(200).json({ data: deletedContact });
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const { body } = req;
  const updatedContacts = await contactsService.updateContact(id, body);
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
