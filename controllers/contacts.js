// const Joi = require("joi");
const { ctrlsWrapper } = require("../helpers/index");
const contacts = require("../models/contacts");

// const contactSchema = Joi.object({
//   name: Joi.string().min(3).required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().min(10).max(15).required(),
// });

const getContacts = async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(result);
  }
};

const addContact = async (req, res, next) => {
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const removeContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json({ message: "contact deleted" });
  }
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.updateContact(contactId, req.body);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json(result);
  }
};

module.exports = {
  getContacts: ctrlsWrapper(getContacts),
  getContactById: ctrlsWrapper(getContactById),
  addContact: ctrlsWrapper(addContact),
  removeContact: ctrlsWrapper(removeContact),
  updateContact: ctrlsWrapper(updateContact),
};
