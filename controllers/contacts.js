const contacts = require('../models/contacts');

const {
  HttpError,
  controllerWrapper,
} = require('../helpers');

// Отримати всі контакти
const getAll = async (req, res) => {
  const result = await contacts.listContacts();
  res.json(result);

  // catch (error) {
  //     next(error)
  //     // res.status(500).json({message:'Server error'});
  // }
};

// Отримати контакт за id
const getById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.getContactById(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

// Додати контакт
const add = async (req, res) => {
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //     throw HttpError(400, error.message);
  // }
  const result = await contacts.addContact(req.body);
  res.status(201).json(result);
};

// Оновити контакт за id
const updateById = async (req, res) => {
//   const { error } = addSchema.validate(req.body);
//   if (error) {
//     throw HttpError(400, error.message);
//   }
  const { id } = req.params;
  const result = await contacts.updateContact(id, req.body);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  res.json(result);
};

// Видалити контакт за id
const deleteById = async (req, res) => {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if (!result) {
    throw HttpError(404, 'Not found');
  }
  // res.status(204).send();
  res.json({
    message: 'Delete success',
  });
  // res.json(result);
};

module.exports = {
  getAll: controllerWrapper(getAll),
  getById: controllerWrapper(getById),
  add: controllerWrapper(add),
  updateById: controllerWrapper(updateById),
  deleteById: controllerWrapper(deleteById),
};
