const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const { Contact } = require("../../models/contact");
const {
  contactSchema,
  updateContactSchema,
  updateFavoriteSchema
} = require('../../helpers');
const exclusionString = "-createdAt -updatedAt";
const searchByIdErrorMessage = "Cast to ObjectId failed"

router.get('/', async (req, res, next) => {
  try {
    const contactList = await Contact.find({}, exclusionString);
    console.log(contactList)
    res.status(200).json(contactList);
  } catch (err) {
      next(err);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try{
    const { contactId } = req.params;
    const contact = await Contact.findById(contactId, exclusionString);

    contact
      ? res.status(200).json(contact)
      : next(createError(404, 'Not found'));
  } catch (err) {
      if(err.message.includes(searchByIdErrorMessage)) {
        err.status = 404;
      }
      next(err)
  }
})

router.post('/', async (req, res, next) => {
  try{
    const {error} = contactSchema.validate(req.body);

    if (error) {
      next(createError(400, error.message));
    }

    const newContact = await Contact.create(req.body);

    res.status(201).json(newContact);
  } catch (err) {
    next(err)
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const {body} = req
    console.log(123,body)
    if (!body) {
      next(createError(400, "missing field favorite"))
    }

    const {error} = updateFavoriteSchema.validate(body);
    if (error) {
      next(createError(400, error.message));
    }
    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true});

    updatedContact
        ? res.status(201).json(updatedContact)
        : next(createError(404, 'Not found'));
  } catch (err) {
    next(err)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try{
    const { contactId } = req.params
    const removedContact = await Contact.findOneAndRemove(contactId);

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

    const {error} = updateContactSchema.validate(body);
    if (error) {
      next(createError(400, error.message));
    }

    const updatedContact = await Contact.findByIdAndUpdate(contactId, body, { new: true});

    updatedContact
        ? res.json(updatedContact).status(200)
        : next(createError(404, 'Not found'));
  } catch (err) {
      next(err);
  }
})

module.exports = router
