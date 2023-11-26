const { HttpError, CtrlWrapper } = require('../helpers');
const contactsService = require('../service/contacts.service');

const getAll = async (req, res, next) => {
  res.json(await contactsService.getAll());
};

const getById = async (req, res, next) => {
  const contact = await contactsService.getContactById(req.params.contactId);
  if (!contact) {
    throw HttpError(404, 'Contact not found');
  }
  res.json(contact);
};

const add = async (req, res, next) => {
  res.status(201).json(await contactsService.addContact(req.body));
};

const remove = async (req, res, next) => {
  const result = await contactsService.removeContact(req.params.contactId);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json({ message: 'contact deleted' });
};

const update = async (req, res, next) => {
  const result = await contactsService.updateContact(req.params.contactId, req.body);
  if (!result) {
    throw HttpError(404, 'Contact not found');
  }
  res.status(200).json(result);
};

const updateFavorite = async (req, res, next) => {
  const {favorite} = req.body
  if(!favorite) throw HttpError(400, 'missing field favorite');
  const result = await contactsService.updateFavorite(req.params.contactId, favorite);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.status(200).json(result);
};

module.exports = {
  getAll: CtrlWrapper(getAll),
  getById: CtrlWrapper(getById),
  add: CtrlWrapper(add),
  remove: CtrlWrapper(remove),
  update: CtrlWrapper(update),
  updateFavorite: CtrlWrapper(updateFavorite),
};
