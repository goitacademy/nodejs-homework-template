const Contact = require('../models/contacts');
const Joi = require('joi');

const listContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getContactById = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findById(id);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const addContact = async (req, res) => {
  const { name, email, phone } = req.body;
  const schema = Joi.object({
    name: Joi.string().required().messages({
      'any.required': 'Name is required',
    }),
    email: Joi.string().email().required().messages({
      'any.required': 'Email is required',
      'string.email': 'Invalid email format',
    }),
    phone: Joi.string().required().messages({
      'any.required': 'Phone is required',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    try {
      const newContact = await Contact.create(req.body);
      res.status(201).json(newContact);
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const removeContact = async (req, res) => {
  const { id } = req.params;
  try {
    const contact = await Contact.findByIdAndRemove(id);
    if (contact) {
      res.status(200).json({ message: 'Contact deleted' });
    } else {
      res.status(404).json({ message: 'Not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateContact = async (req, res) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const schema = Joi.object({
    name: Joi.string().messages({
      'string.base': 'Name must be a string',
    }),
    email: Joi.string().email().messages({
      'string.email': 'Invalid email format',
    }),
    phone: Joi.string().messages({
      'string.base': 'Phone must be a string',
    }),
  });
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    try {
      const contact = await Contact.findByIdAndUpdate(
        id,
        { name, email, phone },
        { new: true }
      );
      if (contact) {
        res.status(200).json(contact);
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

const updateStatusContact = async (req, res) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  if (favorite === undefined) {
    res.status(400).json({ message: 'Missing field favorite' });
  } else {
    try {
      const contact = await Contact.findByIdAndUpdate(
        contactId,
        { favorite },
        { new: true }
      );
      if (contact) {
        res.status(200).json(contact);
      } else {
        res.status(404).json({ message: 'Not found' });
      }
    } catch (error) {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
