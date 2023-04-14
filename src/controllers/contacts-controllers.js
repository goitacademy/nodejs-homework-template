const Joi = require("joi");

const contacts = require("../models/contacts");

const { HttpError, addContactSchema, updateContactSchema } = require("../helpers");

const addSchema = Joi.object(addContactSchema);
const updateSchema = Joi.object(updateContactSchema);

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getById(contactId);

    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
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
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
};

const updateContactById = async (req, res, next) => {
  try {
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
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addNewContact,
  deleteContactById,
  updateContactById,
};
