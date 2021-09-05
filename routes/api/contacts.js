const express = require('express');
const router = express.Router();

const ctrl = require('../../controllers');
const {
  joiSchemaAddContact,
  joiSchemaUpdateContact,
} = require('../../models/contact');
const { validation } = require('../../middlewares');

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById);

router.post('/', validation(joiSchemaAddContact), ctrl.add);

router.delete('/:contactId', ctrl.del);

router.put('/:id', validation(joiSchemaUpdateContact), ctrl.update);

router.patch(
  '/:contactId/favorite',
  validation(joiSchemaUpdateContact),
  ctrl.updateFavorite
);

module.exports = router;
