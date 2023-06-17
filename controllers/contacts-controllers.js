const contactsService = require("../models/contacts");
const { HttpError } = require("../helpers");

const Joi = require("joi");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getListContacts = async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.getContactById(contactId);
    if (!contact)
      throw HttpError(404, `Сontact with id:${contactId} not found.`);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactAddSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(body);
    if (!result) {
      throw HttpError(400, `${body.name} is already in the contact list.`);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await contactsService.removeContact(contactId);
    if (!contact)
      throw HttpError(404, `Сontact with id:${contactId} not found.`);
    res.status(200).json({ message: "Contact deleted." });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactAddSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const contact = await contactsService.updateContact(contactId, body);
    if (!contact)
      throw HttpError(404, `Сontact with id:${contactId} not found.`);
    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
};
