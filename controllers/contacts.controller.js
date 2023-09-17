const contactsService = require('../aditionalServ/contacts.service');
const { HttpError, controllerWrap } = require('../helpers');

const getAll = async (req, res) => {
  const result = await contactsService.listContacts();
  res.json(result);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.getContactById(id);
  if (!result) throw HttpError(404, 'Not found');
  res.json(result);
};

const create = async (req, res) => {
  const result = await contactsService.createContact(req.body);
  res.status(201).json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateContact(id, req.body);
  if (!result) throw HttpError(404, 'Not found');
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.removeContact(id);
  if (!result) throw HttpError(404, 'Not found');
  res.json({ result, message: 'Delete success' });
};

module.exports = {
  getAll: controllerWrap(getAll),
  getOne: controllerWrap(getOne),
  create: controllerWrap(create),
  update: controllerWrap(update),
  remove: controllerWrap(remove),
};