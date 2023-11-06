import express from "express"
import * as contactsService from '../../models/contacts/contacts.js';
import { HttpError } from "../../helpers/HttpError.js";
import Joi from "joi";

const contactsRouter = express.Router()

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"Name" is required field`
  }),
  email: Joi.string().required().messages({
    "any.required": `"Email" is required field`
  }),
  phone: Joi.string().required().messages({
    "any.required": `"Phone" is required field`
  }),
})

contactsRouter.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result)
  } catch (error) {
    next(error)
  }
})

contactsRouter.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contatct with id ${contactId} not found.`);
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

contactsRouter.post('/', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields are empty")
    }
    const { error } = contactAddSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = contactsService.addContact(req.body);
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

contactsRouter.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contatct with id ${contactId} not found and can't be deleted.`);
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "All fields are empty")
    }

    const { error } = contactAddSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }

    const { contactId } = req.params;

    const result = contactsService.updateContact(contactId, req.body);

    if (!result) {
      throw HttpError(404, `Contatct with id ${contactId} not found.`);
    }

    res.json(result)
  } catch (error) {
    next(error)
  }
})

export default contactsRouter;
//for pr