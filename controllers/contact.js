const { Contact } = require('../models');
const createError = require('http-errors');

const getContacts = async (req, res, next) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404).json({ message: 'Not found', error: '404' });
  } else {
    res.status(200).json(contact);
  }
};

const createContact = async (req, res, next) => {
  const result = await Contact.create(req.body);
  if (!result) {
    return res.status(400).json({ message: 'missing name field' });
  }
  return res.status(201).json({
    result,
  });
};

const updateContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Missing field' });
    }
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return next(createError(404, 'Contact not found'));
  }
};

const removeContact = async (req, res, next) => {
  const { id } = req.params;
  try {
    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({
        message: 'Not found',
      });
    }
    return res.status(200).json({
      message: 'Deleted contact',
    });
  } catch (error) {
    return next(createError(404, 'Contact not found'));
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
