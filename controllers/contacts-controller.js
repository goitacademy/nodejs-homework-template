const Joi = require("joi");

const contactsService = require("../models/contacts");

const { HttpError } = require("../helpers");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .pattern(/^\S+@\S+\.\S+$/),
  phone: Joi.string()
    .required()
    .pattern(/^[\d()+\- ]+$/),
});

const getAllMovies = async (req, res, next) => {
  try {
    const results = await contactsService.listContacts();
    res.json(results);
  } catch (error) {
    next(error);
  }
};

const gerById = async (req, res, next) => {
  try {
    const result = await contactsService.getContactById(req.params.contactId);
    console.log(`results222`, result);
    if (!result) {
      throw HttpError(404, `Movie with ${req.params.contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const results = await contactsService.addContact(req.body);
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const result = await contactsService.removeContact(req.params.contactId);
    if (!result) {
      throw HttpError(404, `Movie with ${req.params.contactId} not found`);
    }
    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contactsService.updateContact(
      req.params.contactId,
      req.body
    );
    if (!result) {
      throw HttpError(404, `Movie with ${req.params.contactId} not found`);
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllMovies,
  gerById,
  addContact,
  deleteContact,
  updateContact,
};
