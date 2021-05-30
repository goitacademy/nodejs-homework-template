const mongoose = require('mongoose');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../model/contacts');

const getAll = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const { total, limit, page, contacts } = await listContacts(
      userId,
      req.query,
    );
    return res.status(200).json({
      status: 'success',
      code: 200,
      data: { total, limit, page, contacts },
    });
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    if (!mongoose.isValidObjectId(req.params.contactId)) {
      return res.status(400).json({ message: 'invalid contactId value' });
    }
    const userId = req.user.id;
    const contact = await await getContactById(userId, req.params.contactId);

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
    const userId = req.user.id;
    const contact = await addContact({ ...req.body, owner: userId });
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
    const userId = req.user.id;
    const contact = await removeContact(userId, req.params.contactId);
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
    const userId = req.user.id;
    const contact = await updateContact(userId, req.params.contactId, req.body);
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

module.exports = { getAll, getById, create, remove, update };
