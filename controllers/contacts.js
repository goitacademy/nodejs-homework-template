const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");
const Joi = require("joi");

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const allContacts = async (req, res) => {
  const allContact = await contacts.listContacts();
  res.status(200).json(allContact);
};

const contactById = async (req, res) => {
  const { contactId } = req.params;
  const getContact = await contacts.getContactById(contactId);
  if (!getContact) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(getContact);  
};

const addContact = async (req, res) => {
  const { error } = addShema.validate(req.body);
  if (error) {
    console.log(error.details);
    throw HttpError(400, `missing required ${error.details[0].path} field`);
  }
  const addContact = await contacts.addContact(req.body);
  res.status(201).json(addContact);
};

const removeContact = async (req, res) => {
  const deleteContacts = await contacts.removeContact(req.params.contactId);
  if (!deleteContacts) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json({ message: "contact deleted" });
};

const updateContact = async (req, res) => {
  if (Object.keys(req.body).length === 0) {
    throw HttpError(400, "missing fields");
  }
  const { error } = addShema.validate(req.body);
  if (error) {
    throw HttpError(400, `missing required ${error.details[0].path} field`);
  }
  const update = await contacts.updateContact(req.params.contactId, req.body);
  if (!update) {
    throw HttpError(404, "Not found");
  }
  res.status(200).json(update);
};

module.exports = {
  allContacts: ctrlWrapper(allContacts),
  contactById: ctrlWrapper(contactById),
  addContact: ctrlWrapper(addContact),
  removeContact: ctrlWrapper(removeContact),
  updateContact: ctrlWrapper(updateContact),
};
