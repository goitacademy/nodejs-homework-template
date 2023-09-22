const { HttpError } = require('../helpers');
const contactsService = require('../models');
const { userSchema } = require('../schemas');

// Create - add
// Read   - getAll
// ReadOne - getById
// Update  - updateById
// Delete  - deleteById

const getAll = async (_, res, next) => {
  try {
    const result = await contactsService.listContacts();
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);

    if (!result) {
      throw HttpError(404);
    }
    return res.json(result);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    console.log(userSchema.validate(req.body));
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.details[0].message);
    }
    const result = await contactsService.addContact(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const updateById = async (req, res, next) => {
  try {
    const { error } = userSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    const { contactId } = req.params;
    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404);
    }
    return res.json({ message: 'Contact deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  deleteById,
};
