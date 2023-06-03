const Joi = require('joi');

const Contacts = require('../models/contacts');

const { HttpError } = require('../helpers');

const { ctrlWrapper } = require('../helpers');

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `missing required name field`,
  }),
  email: Joi.string().required().messages({
    'any.required': `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    'any.required': `missing required phone field`,
  }),
});

const getAll = async (req, res, next) => {
  try {
    const result = await Contacts.find();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// const getById = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await contactsService.getContactById(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

const add = async (req, res, next) => {
  const { error } = await contactsAddSchema.validate(req.body);
  if (error) {
    throw HttpError(400, error.message);
  }
  const result = await Contacts.create(req.body);
  res.status(201).json(result);
};

// const updateById = async (req, res, next) => {
//   const { error } = await contactsAddSchema.validate(req.body);
//   if (error) {
//     throw HttpError(400, 'Missing fields');
//   }
//   const { id } = req.params;
//   const result = await contactsService.updateContactsById(id, req.body);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json(result);
// };

// const deleteById = async (req, res, next) => {
//   const { id } = req.params;
//   const result = await contactsService.removeContact(id);
//   if (!result) {
//     throw HttpError(404, 'Not found');
//   }
//   res.json({ message: 'contact deleted' });
// };

module.exports = {
  getAll,
//   getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
//   updateById: ctrlWrapper(updateById),
//   deleteById: ctrlWrapper(deleteById),
};
