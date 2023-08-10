const Joi = require("joi");
const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const getAllContacts = async (_, res) => {
  const data = await contacts.listContacts();

  res.json(data);
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;

  const data = await contacts.getById(contactId);

  if (!data) {
    throw HttpError(404, "Not found");
  }

  res.json(data);
};

const addContact = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const data = await contacts.addNewContact(req.body);

  res.status(201).json(data);
};

const updateContactById = async (req, res) => {
  const { error } = addSchema.validate(req.body);

  if (error) {
    throw HttpError(400, error.message);
  }

  const { contactId } = req.params;

  const data = await contacts.updateContact(contactId, req.body);

  if (!data) {
    throw HttpError(404, "Not found");
  }

  res.json(data);
};

const deleteContact = async (req, res) => {
  const { contactId } = req.params;

  const data = await contacts.removeContact(contactId);

  if (!data) {
    throw HttpError(404, "Not found");
  }

  res.json(data);
  // res.status(204).send();
};

module.exports = {
  getAllContacts: ctrlWrapper(getAllContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  updateContactById: ctrlWrapper(updateContactById),
  deleteContact: ctrlWrapper(deleteContact),
};
