const express = require('express');

const controllers = require('../../controllers/contactsControllers');
const validateBody = require('../../middlewares/validateBody');
const schemas = require('../../schemas/contactsSchema');

const router = express.Router();

router.get('/', controllers.getAll);

router.get('/:contactId', controllers.getById);

router.post(
  '/',
  validateBody(schemas.createContactValidationSchema),
  controllers.add
);

router.put(
  '/:contactId',
  validateBody(schemas.updateContactValidationSchema),
  controllers.updateById
);

router.delete('/:contactId', controllers.deleteById);

module.exports = router;
