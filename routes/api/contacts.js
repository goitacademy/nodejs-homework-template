const express = require('express');
const { contacts: controller } = require('../../controllers');
const router = express.Router();

const validation = require('../../middlewares/validation.js');
const { addJoiSchema, favoriteJoiSchema } = require('../../models/contact');

router.get('/', controller.getAll);

router.get('/:contactId', controller.getContactById);

router.post('/', validation(addJoiSchema), controller.addContact);

router.delete('/:contactId', controller.deleteById);

router.put('/:contactId', validation(addJoiSchema), controller.updateContact);

router.patch(
  '/:contactId/favourite',
  validation(favoriteJoiSchema),
  controller.updateFavoriteStatus
);

module.exports = router;
