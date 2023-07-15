const { ctrlWrapper } = require("../helpers");
const { generateHTTPError } = require("../helpers");

const contacts = require("../models/contacts");

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getContacts = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json(contact);
};

const deleteContact = async (req, res) => {
  const { id } = req.params;
  const contact = await contacts.removeContact(id);
  if (!contact) {
    throw generateHTTPError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
};

const postContact = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const contact = await contacts.addContact(req.body);
  res.status(201).json(contact);
};

const putContact = async (req, res) => {
  const { id } = req.params;
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
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  deleteContact: ctrlWrapper(deleteContact),
  postContact: ctrlWrapper(postContact),
  putContact: ctrlWrapper(putContact),
};
