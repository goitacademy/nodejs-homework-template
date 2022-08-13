const Joi = require('joi');
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require('../models/contacts');

const schema = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
    .required()
    .min(5)
    .max(35),

  phone: Joi.string().min(5).max(15).required(),
});

const getAllContacts = async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
};

const addNewContact = async (req, res, next) => {
  const validationBody = schema.validate(req.body);
  if (validationBody.error) {
    console.log(validationBody.error);
    return res.status(400).json({ message: 'missing required name field' });
  }

  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
};

const getOneContact = async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  res.json(contact);
};

const removeOneContact = async (req, res, next) => {
  const removedContact = await removeContact(req.params.contactId);
  if (removedContact.length === 0) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json({ message: 'contact deleted' });
};

const updateOneContact = async (req, res, next) => {
  const validationBody = schema.validate(req.body);
  if (validationBody.error) {
    return res.status(400).json({ message: 'missing fields' });
  }

  const updatedContact = await updateContact(req.params.contactId, req.body);

  if (!updatedContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json(updatedContact);
};

module.exports = {
  getAllContacts,
  addNewContact,
  getOneContact,
  removeOneContact,
  updateOneContact,
};
