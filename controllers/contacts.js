const Joi = require("joi");
const { HttpError, ctrlWrapper } = require("../helpers/index");
const contacts = require("../models/contacts");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const getListContact = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

const addContact = async (req, res) => {
  const { error } = addShema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing required name field");
  }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeByIdContact = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    message: "contact deleted",
  });
};

const updateContact = async (req, res) => {
  const { error } = addShema.validate(req.body);
  if (error) {
    throw HttpError(400, "missing fields");
  }
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json(result);
};

module.exports = {
  getListContact: ctrlWrapper(getListContact),
  getByIdContact: ctrlWrapper(getByIdContact),
  updateContact: ctrlWrapper(updateContact),
  removeByIdContact: ctrlWrapper(removeByIdContact),
  addContact: ctrlWrapper(addContact),
};
