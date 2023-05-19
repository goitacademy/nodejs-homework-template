const express = require('express')
const Joi = require('joi')
const router = express.Router()
const { HttpError } = require('../../helpers');
const contactsService = require('../../models/contacts')

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsService.listContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsService.getContactById(contactId);

    if (!contact) {
      throw HttpError(404,'Not found');
    }

    res.json(contact)
  } catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { name, email, phone } = req.body;

    const contact = await contactsService.addContact({ name, email, phone });
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const getContact = await contactsService.getContactById(contactId); 

    if (!getContact) {
      throw HttpError(404, 'Not found')
    }

    const contact = await contactsService.removeContact(contactId);

    res.json({message: "contact deleted"});
  } catch (err) {
    next(err);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }

    const { name, email, phone } = req.body;
    
    const contact = await contactsService.updateContact(contactId, { name, email, phone });

    if (!contact) {
      throw HttpError(404, "Not found")
    }

    res.json(contact);
  } catch (err) {
    next(err);
  }
})

module.exports = router
