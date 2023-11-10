const service = require('../services/contacts');
const { nanoid } = require('nanoid');
const body = require('../models/contacts');

const listContacts = async (req, res, next) => {
  const contacts = await service.listContacts();

  res.status(200).json(contacts);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const contact = await service.getContactById(id);

  if (!contact) {
    res.status(404).json({ message: 'Not found', error: '404' });
  } else {
    res.status(200).json(contact);
  }
};

const addContact = async (req, res, next) => {
  const { error, value } = body.validate(req.body);

  if (error) {
    return res
      .status(400)
      .json({ message: 'Missing required name, email, or phone field' });
  }

  const body = {
    id: nanoid(8),
    name: value.name,
    lastname: value.lastname,
    email: value.email,
    phone: value.phone,
    favorite: value.favorite,
  };

  const contact = await service.addContact(body);

  res.status(201).json(contact);
};

const updateContact = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const { success, result, message } = await service.updateContact(
      id,
      req.body,
    );

    if (!success) {
      return res.status(404).json({
        result,
        message,
      });
    }

    if (success && Object.keys(updateData).length === 0) {
      return res.status(400).json({ message });
    }

    return res.status(200).json({
      result,
      message,
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
    const { success, result, message } = await service.removeContact(id);

    if (!success) {
      return res.status(404).json({
        result,
        message,
      });
    }

    return res.status(200).json({
      result,
      message,
    });
  } catch (error) {
    return res.status(500).json({
      result: null,
      message: error,
    });
  }
};

module.exports = {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
};
