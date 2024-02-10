const contactsService = require("../services/contactsServices.js");
const { HttpError } = require("../helpers/HttpError.js");
const schema = require("../schemas/contactsSchemas.js");

const getAllContacts = async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404);
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404);
    }
    res.status(204).json(result);
  } catch (error) {
    next(error);
  }
};

const createContact = async (req, res, next) => {
  try {
    const { error } = schema.createContactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const bodyIsEmpty = Object.keys(req.body).length === 0;

    if (bodyIsEmpty) {
      throw HttpError(400, "Body must have at least one field");
    }

    const { error } = schema.updateContactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contactsService.updateContact(id, req.body);

    if (!result) {
      throw HttpError(404);
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
module.exports = {
  getAllContacts,
  getContactById,
  deleteContact,
  createContact,
  updateContact,
};