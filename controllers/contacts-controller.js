const contactsService = require('../models/contacts');
const { HttpError } = require('../helhers/HttpError');
const { ctrlWrapper } = require('../decorators/index');

const getAll = async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getById = async (req, res, next) => {
  // req.params - это объект который содержит все динамические части запроса
  const { contactId } = req.params;
  const result = await contactsService.getContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const addContact = async (req, res, next) => {
  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.updateContact(contactId, req.body);
  if (!result) {
    throw HttpError(404);
  }
  res.json(result);
};

const deleleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contactsService.deleteContact(contactId);
  if (!result) {
    throw HttpError(404);
  }
  res.json({ message: 'Delete success' });
  // статус 204 не отправляет тело
  // res.status(204).json({ message: 'Delete success' });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  addContact: ctrlWrapper(addContact),
  updateById: ctrlWrapper(updateById),
  deleleteById: ctrlWrapper(deleleteById),
};
