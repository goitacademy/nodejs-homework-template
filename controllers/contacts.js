const contacts = require("../models/contacts");
const HttpError = require("../helpers/HttpError");
const ctrlWrapper = require("../helpers/ctrlWrapper");

// const Joi = require("joi");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

const listContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, `missing required ${error.details[0].path[0]} field`);
  // }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res) => {
  //   const { error } = addSchema.validate(req.body);
  //   if (error) {
  //     throw HttpError(400, `missing required ${error.details[0].path[0]} field`);
  //   }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ mesage: "contact deleted" });
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
  removeContact: ctrlWrapper(removeContact),
};
