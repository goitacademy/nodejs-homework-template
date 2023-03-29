const express = require('express');
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');

const HttpError = require('../../helpers/httpError');
const {
  contactAddValidation,
  contactUpdateValidation,
} = require('../../helpers/validation');

/**
 * ============================ Получение всех контакта
 */
router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();

    if (!result) {
      throw HttpError(404, 'Contacts not found');
    }

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

/**
 * ============================ Получение контакта по ID
 */
router.get('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw HttpError(404, `Contact with id ${contactId} Not found`);
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

/**
 * ============================ Добавление контакта
 */
router.post('/', async (req, res, next) => {
  try {
    const { error: validationError, value: contact } =
      contactAddValidation.validate(req.body);

    if (validationError) {
      throw HttpError(400, `${validationError.message}`);
    }

    const createdContact = await addContact(contact);

    if (!createdContact) {
      throw HttpError(500, 'Create contact error');
    }

    res.status(201).json(createdContact);
  } catch (error) {
    next(error);
  }
});

/**
 * ============================ Удаление контакта
 */
router.delete('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    const removed = await removeContact(contactId);

    if (!removed) {
      throw HttpError(404, `Contact with id ${contactId} not found`);
    }

    res.status(200).json({ message: 'contact deleted' });
  } catch (error) {
    next(error);
  }
});

/**
 * ============================ Обновление контакта
 */
router.put('/:contactId', async (req, res, next) => {
  try {
    const contactId = req.params.contactId;

    const { error: validationError, value: update } =
      contactUpdateValidation.validate(req.body);

    if (validationError) {
      throw HttpError(400, `${validationError.message}`);
    }

    const updatedContact = await updateContact(contactId, update);

    if (!updatedContact) {
      throw HttpError(404, `Contact with id ${contactId} not found`);
    }

    return res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
