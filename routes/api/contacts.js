const express = require('express');
const { NotFound } = require('http-errors');
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(6).max(15).required()
});

const contactsOperations = require('../../models/contacts');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);

    if (!result) {
      throw new NotFound();
    };

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      }
    });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      error.status = 400;
      error.message = "missing required name field";
      throw error;
    }

    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);

    if (!result) {
      throw new NotFound();
    };

    res.status(200).json({
      status: 'success',
      code: 200,
      message: "contact deleted",
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      error.status = 400;
      error.message = "missing fields";
      throw error;
    }

    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);

    if (!result) {
      throw new NotFound();
    };

    res.status(200).json({
      status: 'success',
      code: 200,
      data: {
        result,
      },
    })
  } catch (error) {
    next(error);
  }
});

module.exports = router;
