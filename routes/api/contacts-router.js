// const express = require('express');
import express from 'express';
import Joi from 'joi';
// ---------------------------------------------------------
import contactsService from '../../models/contacts.js';

import { HttpError } from '../../helpers/index.js';

// const contacts = require('../../models/contacts.json');
// import contacts from '../../models/contacts.json';
// import contacts from '../../models/contactsData.js';

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
  email: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
  phone: Joi.string().required().messages({
    'any.required': 'missing required name field',
  }),
});

contactsRouter.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.getListContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   message: 'Server error',
    // });
  }
});

contactsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
      // const error = new Error('Not found');
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //   message: 'Not found',
      // });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const { status = 500, message = 'Server error' } = error;
    // res.status(status).json({
    //   message,
    // });
  }
});

contactsRouter.post('/', async (req, res, next) => {
  try {
    // console.log('req.body: ', req.body);
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    // const validateResult = contactAddSchema.validate(req.body);
    // console.log('validateResult: ', validateResult);

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
    // res.json(contactsService[0]);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContactById(id);
    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json({
      message: 'Contact deleted',
    });
    // res.json(contactsService[0]);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsService.updateContactById(id, req.body);
    // console.log('result: ', result);

    if (!result) {
      throw HttpError(404, 'Not found');
    }
    res.json(result);
    // res.json(contactsService[0]);
  } catch (error) {
    next(error);
  }
});

// module.exports = contactsRouter;
export default contactsRouter;
// ---------------------------------------------------------

// const router = express.Router();

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' });
// });

// module.exports = router;
