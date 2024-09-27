const express = require('express');

const router = express.Router();

const {
  getContactsController,
  getContactByIdController,
  addContactController,
  removeContactController,
  updateContactController,
  updateStatusContactController,
} = require('../../controllers/contactController');

const {
  createContactSchema,
  changeContactSchema,
  patchContactSchema,
} = require('../../middlewares/validationMiddleware');

const { catchErrors } = require('../../middlewares/catchErrors');

router.get('/', catchErrors(getContactsController));

router.get('/:contactId', catchErrors(getContactByIdController));

router.post('/', createContactSchema, catchErrors(addContactController));

router.delete('/:contactId', catchErrors(removeContactController));

router.put(
  '/:contactId',
  changeContactSchema,
  catchErrors(updateContactController)
);

router.patch(
  '/:contactId/favorite',
  patchContactSchema,
  catchErrors(updateStatusContactController)
);

module.exports = router;
