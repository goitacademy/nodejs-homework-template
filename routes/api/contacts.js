const express = require('express');

const { tryCatchWrapper } = require('../../helpers');
const {
  getContact,
  getContacts,
  createContact,
  deleteContact,
  changeContact,
  updateStatusContact,
  uploadImageContact,
} = require('../../controllers/contacts.controller');

const { validateBody, upload } = require('../../middlewares/validation');
const {
  contactCreateValidationSchema,
  contactUpdateStatusValidationSchema,
} = require('../../schemas/contactValidationSchema');

const contactsRouter = express.Router();

contactsRouter.get('/', tryCatchWrapper(getContacts));
contactsRouter.get('/:id', tryCatchWrapper(getContact));
contactsRouter.post(
  '/',
  validateBody(contactCreateValidationSchema),
  tryCatchWrapper(createContact)
);
contactsRouter.delete('/:id', tryCatchWrapper(deleteContact));
contactsRouter.put(
  '/:id',
  validateBody(contactCreateValidationSchema),
  tryCatchWrapper(changeContact)
);
contactsRouter.patch(
  '/:id/favorite',
  validateBody(contactUpdateStatusValidationSchema),
  tryCatchWrapper(updateStatusContact)
);
contactsRouter.patch(
  '/:id/image',
  upload.single('image'), // TODO change to array
  tryCatchWrapper(uploadImageContact)
);

module.exports = {
  contactsRouter,
};
