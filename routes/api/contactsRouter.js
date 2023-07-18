import express from 'express';
import Joi from 'joi';
import contactsService from '../../models/contacts.js';
import { HttpError } from '../../helpers/index.js';

// ####################################################

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).required().messages({
    'any.required': '"Phone" is a required field',
  }),
});

// ####################################################

contactsRouter.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.getAllContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get('/:id', async (req, res, next) => {
  try {
    const result = await contactsService.getContactById(req.params.id);

    if (!result)
      throw HttpError(404, 'Could not find contact with the requested id');

    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post('/', async (req, res, next) => {
  console.log('res: ', res);
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) throw HttpError(400, error.message);

    const result = await contactsService.updateContactById(
      req.params.id,
      req.body
    );

    if (!result)
      throw HttpError(404, 'Could not find contact with the requested id');

    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.delete('/:id', async (req, res, next) => {
  try {
    const result = await contactsService.removeContact(req.params.id);

    if (!result)
      throw HttpError(404, 'Could not find contact with the requested id');

    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default contactsRouter;
