const express = require('express');

const router = express.Router();

/**
 * our functions which one is responsible for operations with data depending on the route
 */
const ctrl = require('../../controlers/contacts');

/** in this wrapper  I took out try catch.  */
const { ctrlWrapper } = require('../../helpers');

/** in this function I took out validation body of request */

const { isValidId, authenticate, validateBody } = require('../../middlewares');
/** validation body of request */
const {
  contactsAddSchema,
  contactsUpdateSchema,
} = require('../../models/contact');

router.get('/', authenticate, ctrlWrapper(ctrl.getAllContacts));

router.get(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.getContactById)
);

router.post(
  '/',
  authenticate,
  validateBody(contactsAddSchema),
  ctrlWrapper(ctrl.addContacts)
);

router.delete(
  '/:contactId',
  authenticate,
  isValidId,
  ctrlWrapper(ctrl.deleteContact)
);

router.put(
  '/:contactId',
  authenticate,
  isValidId,
  validateBody(contactsAddSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  '/:contactId/favorite',
  authenticate,
  isValidId,
  validateBody(contactsUpdateSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
