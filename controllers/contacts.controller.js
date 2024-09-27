const contactsService = require('../services/contactsService');
const { HttpError, controllerWrap } = require('../helpers');

const create = async (req, res) => {
  const result = await contactsService.create(req.body);
  res.status(201).json(result);
};

const findAll = async (req, res) => {
  const data = await contactsService.findAll();
  res.json(data);
};

const findOne = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.findOne(id);
  if (!result) throw HttpError(404, 'Not found');
  res.json(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.update(id, req.body);
  if (!result) throw HttpError(404, 'Not found');
  res.json(result);
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.updateFavorite(id, req.body);
  if (!result) throw HttpError(404, 'Not found');
  res.json(result);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const result = await contactsService.remove(id);
  if (!result) throw HttpError(404, 'Not found');
  res.json({ message: 'Contact deleted' });
};

module.exports = {
  create: controllerWrap(create),
  findAll: controllerWrap(findAll),
  findOne: controllerWrap(findOne),
  update: controllerWrap(update),
  updateFavorite: controllerWrap(updateFavorite),
  remove: controllerWrap(remove),
};