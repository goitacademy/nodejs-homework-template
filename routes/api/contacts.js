const express = require('express');
const router = express.Router();
const Joi = require('joi');

const Contact = require('../../models/contacts');
const { createError } = require('../../helpers');


const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const updateStatusContact = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (e) {
    next(e);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw createError(404, 'Not Found');
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(422, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, 'Not Found');
    }
    res.json({
      message: 'Successfully removed contact',
    });
  } catch (e) {
    next(e);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(422, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(req.body, contactId, {new: true});
    if (!result) {
      throw createError(404, 'Not Found');
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = updateStatusContact.validate(req.body);
    if (error) {
      throw createError(400, console.log({ "message": "missing field favorite" }));
    }
    const result = await Contact.findByIdAndUpdate(req.body, contactId, { new: true });
    if (!result) {
      throw createError(404, 'Not Found');
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
});

module.exports = router
