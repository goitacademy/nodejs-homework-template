const express = require('express');
const router = express.Router();

const Joi = require('joi');
const Contact = require('../../models/contact');
const { createError } = require('../../helpers');

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await Contact.find({}, 'name');
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json({
      message: 'contact deleted',
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch('/:contactId/favorite', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw createError(400, error.message);
    }
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw createError(404, 'Not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
