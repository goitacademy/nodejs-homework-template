// const Joi = require("joi");
const contactsFetch = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../utils/index");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

const getAllContacts = async (req, res, next) => {
  const result = await contactsFetch.listContacts();

  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactsFetch.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found user with this ID!");
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await contactsFetch.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactsFetch.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found user with this ID!");
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;

  const result = await contactsFetch.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found user with this ID!");
  }
  res.json({
    message: "Contact deleted success!",
  });
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  deleteContact: ctrlWrapper(deleteContact),
};
