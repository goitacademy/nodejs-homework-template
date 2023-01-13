const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../models/contacts');

const getListController = async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addController = async (req, res, next) => {
  try {
    const result = await addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const deleteController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
    }
    res.json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getListController,
  getByIdController,
  addController,
  updateController,
  deleteController,
};
