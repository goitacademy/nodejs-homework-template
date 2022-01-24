const express = require('express');
const path = require('path');
const createError = require('http-errors')

const router = express.Router();
const contactBookApi = require('../../controllers');
const pathToContact = path.normalize("db/contacts.json");
const {validators} = require('../../helpers')


router.get('/', async (req, res, next) => {
  try {
    const contactList = await contactBookApi.getContacts(pathToContact);
    res.status(200).json(contactList);
  } catch (err) {
      next(err);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try{
    const { contactId } = req.params;
    const contact = await contactBookApi.getContactById(pathToContact, contactId);

    contact
      ? res.status(200).json(contact)
      : next(createError(404, 'Not found'));
  } catch (err) {
      next(err)
  }
})

router.post('/', async (req, res, next) => {
  try{
    const {error} = validators.contactSchema.validate(req.body)

    if (error) {
      next(createError(400, error.message));
    }
    const {name, email, phone} = req.body;

    const newContact = await contactBookApi.addContact(pathToContact, name,email,phone);

    res.status(201).json(newContact);
  } catch (err) {
    next(err)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try{
    const { contactId } = req.params
    const removedContact = await contactBookApi.removeContact(pathToContact, contactId);

    removedContact
        ? res.json(removedContact).status(200)
        : next(createError(404, 'Not found'))
  } catch (err) {
    next(err);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const {body} = req

    if (!body) {
      next(createError(400, "Missing fields"))
    }

    const {error} = validators.contactSchema.validate(req.body)

    if(error) {
      next(createError(400, error.message));
    }

    const updatedContact = await contactBookApi.updateContact(pathToContact, contactId, body);

    updatedContact
        ? res.json(updatedContact).status(200)
        : next(createError(404, 'Not found'));
  } catch (err) {
      next(err);
  }
})

module.exports = router
