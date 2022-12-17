const express = require('express')

const router = express.Router()
// const { NotFound } = require('http-errors');
// const Joi = require('joi');

const ctrl = require('../../controllers/contacts');

const ctrlWrapper = require('../../helpers/ctrlWrapper');

const { validateBody } = require('../../middlewares');

const schemas = require('../../schemas/contacts');

// const {
//   listContacts,
  // getContactById,
  // removeContact,
  // addContact,
  // updateContact,
// } = require('../../models');

// const contactsAction = require('../../models/index');

// const joiSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// });

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:contactId', ctrlWrapper(ctrl.getById));

router.post('/', validateBody(schemas.joiSchema), ctrlWrapper(ctrl.add));

router.delete('/:contactId', ctrlWrapper(ctrl.removeById));

router.put(
  '/:contactId',
  validateBody(schemas.joiSchema),
  ctrlWrapper(ctrl.updateById)
);

module.exports = router;
