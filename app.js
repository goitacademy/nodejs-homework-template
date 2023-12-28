const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const Joi = require('joi');
const contactsRouter = require('./routes/api/contacts');
const { listContacts, getById, addContact, removeContact, updateContact } = require('./routes/api/contacts');

const app = express();
const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

// Визначення схеми для валідації даних
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

// Middleware для валідації даних
const validateContact = (req, res, next) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  next();
};

// Функції для роботи з контактами
const getContacts = (req, res) => {
  const contacts = listContacts();
  res.json(contacts);
};

const getContactById = (req, res) => {
  const { contactId } = req.params;
  const contact = getById(contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

const createContact = (req, res) => {
  const { name, email, phone } = req.body;

  const newContact = addContact({ name, email, phone });
  res.status(201).json(newContact);
};

const deleteContact = (req, res) => {
  const { contactId } = req.params;
  const result = removeContact(contactId);

  if (result) {
    res.json({ message: 'contact deleted' });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

const updateExistingContact = (req, res) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const updatedContact = updateContact(contactId, { name, email, phone });

  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: 'Not found' });
  }
};

// Роути для роботи з контактами з валідацією даних
app.get('/api/contacts', getContacts);
app.get('/api/contacts/:contactId', getContactById);
app.post('/api/contacts', validateContact, createContact);
app.delete('/api/contacts/:contactId', deleteContact);
app.put('/api/contacts/:contactId', validateContact, updateExistingContact);

app.use((req, res) => {
  res.status(404).json({ message: 'Not found' });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;
