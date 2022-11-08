const Contacts = require("../models/contacts.model");
const {
  createNotFoundHttpError,
  createValidationError,
} = require("../helpers/helpers");
const {
  requestBodyValidation,
  contactStatusValidation,
} = require("../validation");

const listContacts = async (req, res, next) => {
  const contacts = await Contacts.find();
  return res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contacts.findById(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  return next(createNotFoundHttpError(id));
};

const addContact = async (req, res, next) => {
  const { value, error } = requestBodyValidation(req.body);
  if (error) {
    return next(createValidationError(error));
  }
  const newContact = await Contacts.create(value);
  return res.status(201).json(newContact);
};

const removeContact = async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await Contacts.findByIdAndRemove(id);
  if (contact) {
    return res.status(200).json(contact);
  }
  return next(createNotFoundHttpError(id));
};

const updateContact = async (req, res, next) => {
  const id = req.params.contactId;
  const { value, error } = requestBodyValidation(req.body);

  if (error) {
    return next(createValidationError(error));
  }
  const newContact = await Contacts.findByIdAndUpdate(
    id,
    { ...value },
    { new: true }
  );
  if (newContact) {
    return res.status(201).json(newContact);
  }
  return next(createNotFoundHttpError(id));
};

const updateStatusContact = async (req, res, next) => {
  const id = req.params.contactId;
  const {
    value: { favorite },
    error,
  } = contactStatusValidation(req.body);

  if (error) {
    return next(createValidationError(error));
  }

  const contact = await Contacts.findByIdAndUpdate(
    id,
    { favorite },
    { new: true }
  );
  if (contact) {
    return res.status(200).json(contact);
  }
  return next(createNotFoundHttpError(id));
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
