const { HttpError } = require('../helpers');
const contactsService = require('../models');
const { userSchema } = require('../schemas');
const { ctrlWrapper } = require('../decorators');

// Create - add
// Read   - getAll
// ReadOne - getById
// Update  - updateById
// Delete  - deleteById

const getAll = async (_, res) => {
  const result = await contactsService.listContacts();
  return res.json(result);
};

const getById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.getContactById(contactId);

  if (!result) {
    throw HttpError(404);
  }
  return res.json(result);
};

const add = async (req, res) => {
  console.log(userSchema.validate(req.body));
  const { error } = userSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.details[0].message);
  }
  const result = await contactsService.addContact(req.body);
  return res.status(201).json(result);
};

const updateById = async (req, res) => {
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
};

const deleteById = async (req, res) => {
  const { contactId } = req.params;
  const result = await contactsService.removeContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  return res.json({ message: 'Contact deleted' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
};
