import express from 'express';
import Joi from 'joi';

import contactsService from '../../models/contacts/contacts.js';
import { HttpError } from '../../helpers/index.js';

const contactsRouter = express.Router();

const contactsAddSchema = Joi.object({
  name: Joi.string().required().messages({
    'any.required': `'name' must be exist`,
  }),
  email: Joi.string().required(),
  phone: Joi.number().required().messages({
    'any.required': `'number' must be exist`,
  }),
});

contactsRouter.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.getAllMovies();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.getMovieById(id);
    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post('/', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addMovie(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete('/:contactId', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.deleteMovieById(id);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }
    res.json({
      message: 'Delete successfull',
    });
  } catch (error) {
    next(error);
  }
});

contactsRouter.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsService.updateMovieById(id, req.body);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
