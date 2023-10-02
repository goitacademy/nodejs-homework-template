import express from 'express';
import Joi from 'joi';

import contactsService from '../../models/index.js';
import HttpError from '../../helpers/HttpError.js';

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

contactsRouter.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json('Internal server error');
  }
});

contactsRouter.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getContactById(id);
    if (!result) {
      throw HttpError(404, 'Not Found');
      // const error = new Error('Not found');
      // error.status = 404;
      // throw error;
      // -------------------------------------------
      // return res.status(404).json({
      //   message: 'Not found',
      // });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const { status = 500, message = 'Internal server error' } = error;
    // res.status(status).json({ message });

    // res.status(500).json(' res.status(500).json('Internal server error');');
  }
});

contactsRouter.post('/', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, 'All fields are empty');
    }

    const { error } = contactAddSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, message);
    }
    res.json({
      message: 'Delete success',
    });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put('/:id', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, 'All fields are empty');
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { id } = req.params;

    const result = await contactsService.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, 'Contact not found');
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
