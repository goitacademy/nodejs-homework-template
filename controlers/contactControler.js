const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../models/contacts");
const Joi = require("joi");

const getlistContacts = async (req, res, next) => {
  const users = await listContacts();

  res.status(200).json(users.body);
};

const getContact = async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(contact.body);
};

const createContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});
const validateContact = async (req, res, next) => {
  const { error } = createContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  next();
};

const createContact = async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact.body);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const message = await removeContact(contactId);
  if (message.type === "error") {
    res.status(404).json({ message: message.body });
    return;
  }
  res.status(200).json({ message: message.body });
};

const changeContact = async (req, res, next) => {
  const { body } = req;
  const { contactId } = req.params;
  if (!body.phone && !body.name && !body.mail) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const result = await updateContact(contactId, body);
  if (result.type === "error") {
    return res.status(404).json({ message: result.body });
  }
  res.status(200).json(result.body);
};

module.exports = {
  getlistContacts,
  getContact,
  validateContact,
  createContact,
  changeContact,
  deleteContact,
};
