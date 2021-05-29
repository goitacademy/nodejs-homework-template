const mongoose = require('mongoose');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require('../model/contacts');

const getAll = async (_req, res, next) => {
  try {
    const contacts = await listContacts();
    return res
      .status(200)
      .json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.contactId)) {
      return res.status(400).json({ message: 'invalid contactId value' });
    }
    const contact = await getContactById(req.params.contactId);

    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    return res
      .status(201)
      .json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.contactId)) {
    return res.status(400).json({ message: 'invalid contactId value' });
  }
  try {
    const contact = await removeContact(req.params.contactId);
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.contactId)) {
    return res.status(400).json({ message: 'invalid contactId value' });
  }
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
};

const patch = async (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params.contactId)) {
    return res.status(400).json({ message: 'invalid contactId value' });
  }
  try {
    if (!req.body) {
      return res.status(400).json({ message: 'missing field favorite' });
    }
    const contact = await updateStatusContact(req.params.contactId, req.body);
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, create, remove, update, patch };
