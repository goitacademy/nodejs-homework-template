const express = require('express');
const { httpError, tryCatchWrapper } = require('../../services/index.js');
const { validateBody } = require('../../middlewares/validateBody');
const { addContactSchema } = require('../../schemas/addContactValidation');
const {
  updateContactSchema,
} = require('../../schemas/updateContactValidation');
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');
const router = express.Router();

router.get(
  '/',
  tryCatchWrapper(async (req, res, next) => {
    const contacts = await getContacts();
    await res.status(200).json(contacts);
    next();
  })
);

router.get(
  '/:contactId',
  tryCatchWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return next(httpError(404, 'Not found'));
    }

    return res.status(200).json(contact);
  })
);

router.post(
  '/',
  validateBody(addContactSchema),
  tryCatchWrapper(async (req, res, next) => {
    const createdContact = await addContact(req.body);
    res.status(201).json(createdContact);
  })
);

router.delete(
  '/:contactId',
  tryCatchWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const deletedContact = await getContactById(contactId);

    if (!deletedContact) {
      return next(httpError(404, 'Not found'));
    }
    await removeContact(contactId);
    return res.status(200).json({ message: 'Contact deleted' });
  })
);

router.put(
  '/:contactId',
  validateBody(updateContactSchema),
  tryCatchWrapper(async (req, res, next) => {
    const { contactId } = req.params;
    const updatedContact = await updateContact(contactId, req.body);

    if (!updatedContact) {
      return next(httpError(404, 'Not found'));
    }

    return res.status(200).json(updatedContact);
  })
);

module.exports = router;
