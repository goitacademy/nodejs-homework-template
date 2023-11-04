const service = require('../services/contacts');
const { nanoid } = require('nanoid');

const listContacts = async (req, res, next) => {
  const result = await service.listContacts();

  res.status(200).json(result);
};

const getContactById = async (req, res, next) => {
  const { id } = req.params;
  const result = await service.getContactById(id);

  if (!result) {
    res.status(404).json({ message: 'Not found', error: '404' });
  } else {
    res.status(200).json(result);
  }
};

const addContact = async (req, res, next) => {
  const { name, email, phone } = req.body;

  if (!name || !email || !phone) {
    return res
      .status(400)
      .json({ message: 'Missing required name, email, or phone field' });
  }

  const newContact = {
    id: nanoid(8),
    name,
    email,
    phone,
  };

  const result = await service.addContact(newContact);

  res.status(201).json(result);
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
  //res.json({ message: 'Contact was deleted successfully.' });
  try {
    const { id } = req.params;
    const { success, result, message } = await service.removeContact(id);

    if (!success) {
      return res.status(400).json({
        result,
        message: 'Contact not found',
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
