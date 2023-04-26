const { HttpError } = require("../helpers/index");
const Joi = require("joi");
const { ctrlWrapper } = require("../helpers/index");

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const changeContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

const getContacts = async (req, res, next) => {
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
  const { error } = addContactSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

const deleteContacts = async (req, res) => {
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json({ message: "contact deleted" });
  // res.status(204).send();
};

const changeContact = async (req, res) => {
  const { error } = changeContactSchema.validate(req.body);

  if (error) {
    throw HttpError(400, "missing required name field");
  }

  const { contactId } = req.params;

  const result = await contacts.updateContact(contactId, req.body);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = {
  getContacts: ctrlWrapper(getContacts),
  getContactById: ctrlWrapper(getContactById),
  addContact: ctrlWrapper(addContact),
  deleteContacts: ctrlWrapper(deleteContacts),
  changeContact: ctrlWrapper(changeContact),
};
