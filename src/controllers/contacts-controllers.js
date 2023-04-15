const Joi = require("joi");

const contacts = require("../models/contacts");

const controllerWrapper = require("../utils/controllerWrapper");

const {
  HttpError,
  addContactSchema,
  updateContactSchema,
} = require("../helpers");

const addSchema = Joi.object(addContactSchema);
const updateSchema = Joi.object(updateContactSchema);

const getAllContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getById(contactId);

  if (!result) {
    throw HttpError(404, `Not found`);
  }

  res.status(200).json(result);
};

const addNewContact = async (req, res, next) => {
  try {
    const validationResult = addSchema.validate(req.body);
    if (validationResult.error) {
      throw HttpError(400, `missing required name field`);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json({ message: "contact deleted" });
};

const updateContactById = async (req, res, next) => {
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }

  const validationResult = updateSchema.validate(req.body);

  if (validationResult.error) {
    throw HttpError(400, `missing required name field`);
  }

  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.status(200).json(result);
};

module.exports = {
  getAllContacts: controllerWrapper(getAllContacts),
  getContactById: controllerWrapper(getContactById),
  addNewContact: controllerWrapper(addNewContact),
  deleteContactById: controllerWrapper(deleteContactById),
  updateContactById: controllerWrapper(updateContactById),
};
