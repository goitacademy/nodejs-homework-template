const { Router } = require('express');
const validateId = require('../../middlewares/validateId');
const validateBody = require('../../middlewares/validateBody');
const authenticate = require('../../middlewares/authenticate');

const {
  contactJoiSchema,
  favoritJoiSchema,
} = require('../../utils/validation/contactValidationSchemas');

const ctrl = require('../../controllers/contactsControllers');

const router = Router();

router
  .route('/')
  .get(authenticate, ctrl.getContactsController)
  .post(
    authenticate,
    validateBody(contactJoiSchema),
    ctrl.addContactController
  );

router
  .route('/:contactId')
  .get(authenticate, validateId, ctrl.getContactController)
  .put(
    authenticate,
    validateId,
    validateBody(contactJoiSchema),
    ctrl.updateContactController
  )
  .delete(authenticate, validateId, ctrl.removeContactController);

router
  .route('/:contactId/favorit')
  .patch(
    authenticate,
    validateId,
    validateBody(favoritJoiSchema),
    ctrl.updateStatusContact
  );

module.exports = router;
