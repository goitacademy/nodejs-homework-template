const express = require('express');
const createError = require('http-errors');
const router = express.Router();

const { authenticate } = require('../../middlewares');

const { Contact } = require("../../models");
const {validators :{
  contactValidator
}} = require('../../helpers');

const exclusionString = "-createdAt -updatedAt";
const searchByIdErrorMessage = "Cast to ObjectId failed"

router.get('/', authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page -1)* limit;
    const { _id } = req.user;
    const contactList = await Contact.find({owner: _id}, exclusionString,{skip, limit: Number(limit)})
      .populate('owner', "email");
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

router.post('/', authenticate, async (req, res, next) => {
  const {body} = req;
  try{
    const {error} = contactValidator.contactValidator.validate(body);

    if (error) {
      next(createError(400, error.message));
    }

    const data = {...body, owner: req.user._id};
    const newContact = await Contact.create(data);

    res.status(201).json(newContact);
  } catch (err) {
    next(err)
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const {body} = req;

    if (!body) {
      next(createError(400, "missing field favorite"))
    }

    const {error} = contactValidator.updateFavoriteSchema.validate(body);
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

    const {error} = contactValidator.updateContactSchema.validate(body);
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
