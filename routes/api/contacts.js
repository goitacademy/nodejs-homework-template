const express = require('express');
const router = express.Router();
const Joi = require('joi');
const { listContacts, getContactById, addContact, updateContact } = require('../../models/contacts');
const { HttpError } = require('../../helpers');

const contactSchema = Joi.object({
  name: Joi.string().pattern(/^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$/).required().messages({
    "any.required": `name must be exist`,
    "string.pattern.base": `name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan`
    }),
  email: Joi.string().email().required().messages({
    "any.required": `email must be exist`,
    "string.email": `enter a valid email`
    }),
  phone: Joi.string().pattern(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/).required().messages({
    "any.required": `phone must be exist`,
    "string.pattern.base": `phone number must be digits and can contain spaces, dashes, parentheses and can start with +`
    }),
});

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await listContacts();

    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);

    if (!contactById) {
      throw HttpError(404, 'Not found');
    };

    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    };

    const newContact = await addContact(req.body);

    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    } else if (error) {
      throw HttpError(400, error.message);
    };

    const { contactId } = req.params;
    const updatedContact = updateContact(contactId, req.body).then(
      contact => {
        console.log(contact);
        if (contact === null) {
          throw HttpError(404, 'Not found');
        }
      }
    );

    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
});

module.exports = router;
