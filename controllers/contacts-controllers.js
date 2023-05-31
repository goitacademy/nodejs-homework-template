const contactsService = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const cntrlWrapper = require("../decorators/cntrlWrapper");

const listContacts = async (req, res, next) => {
  const result = await contactsService.listContacts();

  if (!result) {
    res.status(500).json({
      message: "Server error",
    });
  }

  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);

  if (!result) {
    throw HttpError(404, `Contact with ${contactId} not found`);
  }

  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);

  if (!result) next(error);

  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }

  res.json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, `Contact with id ${contactId} not found`);
  }
  res.json({ message: "deleted" });
};

module.exports = {
  listContacts: cntrlWrapper(listContacts),
  getContactById: cntrlWrapper(getContactById),
  addContact: cntrlWrapper(addContact),
  removeContact: cntrlWrapper(removeContact),
  updateContact: cntrlWrapper(updateContact),
};
