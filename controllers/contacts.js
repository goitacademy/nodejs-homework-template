const { Contact } = require('../models');

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
  try {
    const { id } = req.params;
    const result = await Contact.findByIdAndUpdate(id, req.body);

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({ message: 'Missing field' });
    }
    if (!result) {
      return res.status(200).json({
        message: 'found',
      });
    }
    return res.status(200).json({
      result,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

const removeContact = async (req, res, rext) => {
  try {
    const { id } = req.params;
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
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

module.exports = {
  getContacts,
  getContactById,
  createContact,
  updateContact,
  removeContact,
};
