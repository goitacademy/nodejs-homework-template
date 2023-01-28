const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateStatusContact,
} = require('../../controllers/contacts.controller');
const router = express.Router();
const { HttpError } = require('../../helpers/index');
const { tryCatchWrapper, validateBody } = require('../../helpers/index');
const currentUser = require('../../middlwares/auth');
const { contactValidation } = require('../../models/contact');

router.get(
  '/',
  currentUser,
  tryCatchWrapper(async (req, res, next) => {
    res.status(200).json(await listContacts(req, res));
  }),
);

router.get(
  '/:contactId',
  tryCatchWrapper(async (req, res, next) => {
    const searchedContact = await getContactById(req.params.contactId);
    if (!searchedContact) {
      return next(
        HttpError(
          404,
          `Contact with id ${req.params.contactId} can't be found`,
        ),
      );
    }
    res.status(200).json(searchedContact);
  }),
);

router.post(
  '/',
  currentUser,
  validateBody(contactValidation),
  tryCatchWrapper(async (req, res, next) => {
    res.status(201).json(await addContact(req));
  }),
);

router.delete(
  '/:contactId',
  tryCatchWrapper(async (req, res, next) => {
    const contactById = req.params.contactId;
    const searchedContact = await getContactById(contactById);

    if (!searchedContact) {
      return next(
        HttpError(404, `Contact with id ${contactById} can't be found`),
      );
    }
    await removeContact(contactById);
    res.status(200).json({ message: 'contact deleted' });
  }),
);

router.put(
  '/:contactId/favorite',
  validateBody(contactValidation),
  tryCatchWrapper(async (req, res, next) => {
    const contactById = req.params.contactId;
    const contactBody = req.body;
    const searchedContact = await getContactById(contactById);
    if (!searchedContact) {
      return next(
        HttpError(404, `Contact with id ${contactById} can't be found`),
      );
    }
    if (!contactBody) {
      return next(HttpError(404, `Missing field favorite`));
    }
    res.status(200).json(await updateStatusContact(contactById, req.body));
  }),
);

module.exports = router;
