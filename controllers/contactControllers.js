const Joi = require("joi");

const HttpError = require("../utils/HttpError");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const getAllContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await getContactById(contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId, req.body);

    if (!contact) {
      throw HttpError(404, "Not Found");
    }

    res.json({ message: "Contact was removed" });
  } catch (error) {
    next(error);
  }
};

const addNewContact = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);

    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const updatedContact = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }

    const { contactId } = req.params;
    const contact = await updateContact(contactId, req.body);

    res.json(contact);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllContacts,
  getContact,
  deleteContact,
  addNewContact,
  updatedContact,
};
