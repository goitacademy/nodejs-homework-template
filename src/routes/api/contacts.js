const { Router } = require('express');
const validateId = require('../../middlewares/validateId');
const validateBody = require('../../middlewares/validateBody');
const { contactJoiSchema, favoritJoiSchema } = require('../../models/contact');

const ctrl = require('../../controllers/contactsControllers');

const router = Router();

router
  .route('/')
  .get(ctrl.getContactsController)
  .post(validateBody(contactJoiSchema), ctrl.addContactController);

router
  .route('/:contactId')
  .get(validateId, ctrl.getContactController)
  .put(validateId, validateBody(contactJoiSchema), ctrl.updateContactController)
  .delete(validateId, ctrl.removeContactController);

router
  .route('/:contactId/favorit')
  .patch(validateId, validateBody(favoritJoiSchema), ctrl.updateStatusContact);

module.exports = router;
