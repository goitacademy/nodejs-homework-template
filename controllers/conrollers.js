const { ctrlWrapper } = require("../helpers");
const { generateHTTPError } = require("../helpers");

const contacts = require("../models/contacts");

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const listContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json(contact);
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  const contact = await contacts.removeContact(id);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const addContact = async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};

const updateContact = async (req, res, next) => {
  const id = req.params;
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }
  const contact = await contacts.updateContact(id, req.body);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json(contact);
};

module.exports = {
  listContacts: ctrlWrapper(listContacts),
  getContactById: ctrlWrapper(getContactById),
  removeContact: ctrlWrapper(removeContact),
  addContact: ctrlWrapper(addContact),
  updateContact: ctrlWrapper(updateContact),
};
