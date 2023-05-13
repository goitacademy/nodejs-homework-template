const Joi = require("joi");

const contactsService = require("../models/contacts");

const { HttpError } = require("../helpers");

const { ctrlWrapper } = require("../decorators/");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .required()
    .pattern(/^\S+@\S+\.\S+$/),
  phone: Joi.string()
    .required()
    .pattern(/^[\d()+\- ]+$/),
});

const getAllMovies = async (req, res) => {
  const results = await contactsService.listContacts();
  res.json(results);
};

const getById = async (req, res) => {
  const result = await contactsService.getContactById(req.params.contactId);
  console.log(`results222`, result);
  if (!result) {
    throw HttpError(404, `Movie with ${req.params.contactId} not found`);
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = contactAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const results = await contactsService.addContact(req.body);
  res.status(201).json(results);
};

const deleteContact = async (req, res) => {
  const result = await contactsService.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, `Movie with ${req.params.contactId} not found`);
  }
  res.json({ message: "Delete success" });
};

const updateContact = async (req, res, next) => {
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
};

module.exports = {
  getAllMovies: ctrlWrapper(getAllMovies),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
