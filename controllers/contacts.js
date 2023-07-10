const Joi = require("joi");

const contactsHandler = require("../models/contacts");

const HttpError = require("../helpers");

const validateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAllContacts = async (req, res, next) => {
  try {
    const allContacts = await contactsHandler.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const foundContact = await contactsHandler.getContactById(contactId);

    if (!foundContact) {
      throw HttpError(404, "Not found");
    }

    res.json(foundContact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const { error } = validateSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const addContact = await contactsHandler.addContact({ name, email, phone });
    res.status(201).json(addContact);
  } catch (error) {
    next(error);
  }
};

const changeContact = async (req, res, next) => {
  try {
    const { error } = validateSchema.validate(req.body);

    if (error) {
      console.log("SFDSSF", error.message);
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const result = await contactsHandler.updateContact(contactId, req.body);
    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsHandler.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllContacts,
  getContactById,
  addContact,
  changeContact,
  deleteContact,
};
