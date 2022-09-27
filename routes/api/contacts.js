const express = require('express');

const ctrl = require('../../controllers/contacts');

const { ctrlWrapper } = require('../../helpers');

const validateBody = require('../../middlewares');

const contactAddSchema = require('../../schemas/contactAddSchema');

const router = express.Router();

router.get('/', ctrlWrapper(ctrl.getAllContacts));

router.get('/:id', ctrlWrapper(ctrl.getContactById));

router.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(ctrl.addNewContacts)
);

router.delete('/:id', ctrlWrapper(ctrl.deleteContact));

router.put(
  '/:id',
  validateBody(contactAddSchema),
  ctrlWrapper(ctrl.contactUpdate)
);

module.exports = router;
