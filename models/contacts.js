const { v4: uuidv4 } = require('uuid');
const Joi = require('joi');
const { Contact } = require('../services/contactsService');

const handleErrors = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

const listContacts = handleErrors(async (req, res) => {
  const contacts = await Contact.find();
  console.log('Contacts found:', contacts);
  res.json(contacts);
});

const getContactById = handleErrors(async (req, res) => {
  const contactId = req.params.id;
  const contact = await Contact.findById(contactId);
  res.json(contact);
});

const removeContact = handleErrors(async (req, res) => {
  const contactId = req.params.id;
  const result = await Contact.findByIdAndDelete(contactId);

  if (!result) {
    res.status(404).json({ message: 'Contact not found' });
  } else {
    res.json({ message: 'Contact deleted' });
  }
});

const addContact = handleErrors(async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    const newContact = await Contact.create({
      id: uuidv4(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: req.body.favorite || false,
    });
    res.status(201).json(newContact);
  }
});

const updateContact = handleErrors(async (req, res) => {
  const contactId = req.params.id;

  const schema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
    favorite: Joi.boolean(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        favorite: req.body.favorite || false,
      },
      { new: true }
    );

    if (!updatedContact) {
      res.status(404).json({ message: 'Contact not found' });
    } else {
      res.json(updatedContact);
    }
  }
});

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
