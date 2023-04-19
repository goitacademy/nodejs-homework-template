const Joi = require("joi");
const contacts = require("../models/contacts");
const { HTTPError } = require("../helpers");
const { ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
  email: Joi.string().email().required(),
});

const getAll = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.status(200).json(allContacts);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  console.log(contactId);
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    throw HTTPError(404, "Not Found");
  }
  res.status(200).json(contact);
};

const addContact = async (req, res) => {
  const body = req.body;
  const { error } = addSchema.validate(body);
  console.log(error);
  if (error) {
    throw HTTPError(400, error.message);
  }
  const contact = await contacts.addContact(body);
  res.status(201).json(contact);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId);
  if (!contact) {
    throw HTTPError(404, "Not Found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  const body = req.body;
  const { error } = addSchema.validate(body);
  console.log(error);
  if (error) {
    throw HTTPError(400, error.message);
  }
  const { contactId } = req.params;
  const contact = await contacts.updateContact(contactId, body);
  if (!contact) {
    throw HTTPError(404, "Not Found");
  }
  res.status(201).json(contact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  deleteContact: ctrlWrapper(deleteContact),
  updateContact: ctrlWrapper(updateContact),
};
