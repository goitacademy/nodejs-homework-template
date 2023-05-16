const contactsService = require("../models/contactsService");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../decorators/ctrlWrapper");

const getAllContacts = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  console.log(req.body);
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contactsService.getContactById(id);
  if (!contact) {
    throw new HttpError(404, `Contact with ${id} not found`);
  }

  const updatedContact = {
    ...contact,
    ...req.body,
  };

  const result = await contactsService.updateContact(id, updatedContact);
  res.json(result);
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`);
  }

  res.json({
    message: "Contact deleted",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
