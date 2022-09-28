const express = require('express');

const router = express.Router();

/**
 * our functions which one is responsible for operations with data depending on the route
 */
const ctrl = require('../../controlers/contacts');

/** in this wrapper  I took out try catch.  */
const { ctrlWrapper } = require('../../helpers');

/** in this function I took out validation body of request */
const { validateBody } = require('../../middlewares');
const { isValidId } = require('../../middlewares');
/** validation body of request */
const {
  contactsAddSchema,
  contactsUpdateSchema,
} = require('../../models/contact');

router.get('/', ctrlWrapper(ctrl.getAllContacts));

router.get('/:contactId', isValidId, ctrlWrapper(ctrl.getContactById));

router.post(
  '/',
  validateBody(contactsAddSchema),
  ctrlWrapper(ctrl.addContacts)
);

router.delete('/:contactId', isValidId, ctrlWrapper(ctrl.deleteContact));

router.put(
  '/:contactId',
  isValidId,
  validateBody(contactsAddSchema),
  ctrlWrapper(ctrl.updateContact)
);

router.patch(
  '/:contactId/favorite',
  isValidId,
  validateBody(contactsUpdateSchema),
  ctrlWrapper(ctrl.updateStatusContact)
);

module.exports = router;
