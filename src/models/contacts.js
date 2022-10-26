// const fs = require('fs/promises')
let contacts = require('./contacts.json');
const Joi = require('joi');

const listContacts = async (req, res) => {
  res.json({ contacts, status: 'success', status_code: 200 });
};

const getContactById = async (req, res) => {
  const { contactId } = req.params;
  const [chosenContact] = contacts.filter(({ id }) => id === contactId);
  if (!chosenContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  res.json({
    chosenContact,
    status: 'success',
    status_code: 200,
  });
};

const removeContact = async (req, res) => {
  const { contactId } = req.params;
  const [chosenContact] = contacts.filter(({ id }) => id === contactId);
  if (!chosenContact) {
    return res.status(404).json({ message: 'Not found' });
  }
  const remainingContacts = contacts.filter(
    contact => contact.id !== contactId
  );
  contacts = remainingContacts;
  res.json({
    contacts,
    status: 'success',
    status_code: 200,
    message: 'contact deleted',
  });
};

const addContact = (req, res) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^\w+(?:\s+\w+)*$/)
      .min(3)
      .max(40)
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phone: Joi.string().alphanum().min(3).max(30).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ message: validation.error.details });
  }

  const { name, email, phone } = req.body;
  const contactToPost = {
    id: new Date().getTime().toString(),
    name,
    email,
    phone,
  };

  contacts.push(contactToPost);

  res.json({ status: 'success', status_code: 201 });
};

const updateContact = async (req, res) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^\w+(?:\s+\w+)*$/)
      .min(3)
      .max(40)
      .required(),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    }),
    phone: Joi.string().alphanum().min(3).max(30).required(),
  });

  const validation = schema.validate(req.body);

  if (validation.error) {
    return res.status(400).json({ message: validation.error.details });
  }

  const { contactId } = req.params;
  const contactToUpdate = contacts.find(contact => contact.id === contactId);
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res.status(400).json({ message: 'Missing fields' });
  } else if (!contactToUpdate) {
    return res.status(404).json({ message: 'Not Found' });
  }

  contacts.forEach(contact => {
    if (contact.id === contactId) {
      contact.name = name;
      contact.email = email;
      contact.phone = phone;
    }
  });

  res.json({
    contact: contacts[+contactId - 1],
    status: 'success',
    status_code: 200,
    message: 'contact updated',
  });
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
