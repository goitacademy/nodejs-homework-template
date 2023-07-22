import contactsService from '../models/contacts.js';
import { controllerWrapper } from '../decorators/index.js';

const notFoundMsg = 'Could not find contact with the requested id';

// ####################################################

const getAll = async (req, res, next) => {
  const result = await contactsService.getAllContacts();
  res.json(result);
};

const getById = async ({ params: { id } }, res, next) => {
  const result = await contactsService.getContactById(id);
  if (!result) throw HttpError(404, notFoundMsg);

  res.json(result);
};

const add = async (req, res, next) => {
  //   const { error } = contactAddSchema.validate(req.body);
  //   if (error) throw HttpError(400, error.message);

  const result = await contactsService.addContact(req.body);
  res.status(201).json(result);
};

const updateById = async ({ body, params: { id } }, res, next) => {
  //   const { error } = contactAddSchema.validate(body);
  //   if (error) throw HttpError(400, error.message);

  const result = await contactsService.updateContactById(id, body);
  if (!result) throw HttpError(404, notFoundMsg);

  res.json(result);
};

const deleteById = async (req, res, next) => {
  const result = await contactsService.removeContact(req.params.id);
  if (!result) throw HttpError(404, notFoundMsg);

  res.json(result);
};

export default {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  updateById: controllerWrapper(updateById),
  deleteById: controllerWrapper(deleteById),
};
