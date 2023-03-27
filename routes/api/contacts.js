const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require('../../models/contacts');
const Joi = require('joi');
const CustomJoi = Joi.extend(require('joi-phone-number'));

const router = express.Router();

/**
 * ============================ Получение всех контакта
 */
router.get('/', async (req, res, next) => {
  const result = await listContacts();
  res.status(200).json(result);
});

/**
 * ============================ Получение контакта по ID
 */
router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  res.status(200).json(contact);
});

/**
 * ============================ Добавление контакта
 */
router.post('/', async (req, res, next) => {
  const validationSchema = CustomJoi.object({
    name: CustomJoi.string().min(3).max(30).required(),

    email: CustomJoi.string()
      .email({
        minDomainSegments: 2,
      })
      .required(),

    phone: CustomJoi.string()
      .phoneNumber({ format: 'international' })
      .required(),
  });

  const { error: validationError, value: validContact } =
    validationSchema.validate(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError.message });
  }

  const contact = await addContact(validContact);
  res.status(201).json(contact);
});

/**
 * ============================ Удаление контакта
 */
router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;

  const removed = await removeContact(contactId);

  if (removed) {
    return res.status(200).json({ message: 'contact deleted' });
  }

  res.status(404).json({ message: 'Not found' });
});

/**
 * ============================ Обновление контакта
 */
router.put('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId;

  const validationSchema = CustomJoi.object({
    name: CustomJoi.string().min(3).max(30),

    email: CustomJoi.string().email({
      minDomainSegments: 2,
    }),

    phone: CustomJoi.string().phoneNumber({ format: 'international' }),
  }).min(1);

  const { error: validationError, value: validUpdate } =
    validationSchema.validate(req.body);

  if (validationError) {
    return res.status(400).json({ message: validationError.message });
  }

  const updatedContact = await updateContact(contactId, validUpdate);

  if (!updatedContact) {
    return res.status(404).json({ message: 'Contact not found' });
  }

  return res.status(200).json(updatedContact);
});

module.exports = router;
