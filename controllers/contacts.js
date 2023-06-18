const { HttpError, ctrlWrapper } = require("../helpers");
const contactsService = require("../models/contacts");
const contactsAddSchema = require("../schemas/contacts");

const getAll = async (req, res, next) => {
  const result = await contactsService.listContacts();

  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const result = await contactsService.getContactById(req.params.contactId);
  if (!result) {
    throw HttpError(404, "Not Found");
  }
  res.status(200).json(result);
};

const addContact = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res, next) => {
  const { error } = contactsAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }

  const result = await contactsService.updateContact(
    req.params.contactId,
    req.body
  );
  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
