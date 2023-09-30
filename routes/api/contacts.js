import express from "express";
import Joi from "joi";

import * as contactsService from "../../models/index.js";

import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
      "any.required": `"name" required field`
  }),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

contactsRouter.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.getAllContacts();
    res.status(200).json(result);
}
catch (error) {
    next(error);
}
})

contactsRouter.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
        throw HttpError(404, `Contact with ${contactId} not found`);
    }
    res.status(200).json(result);
}
catch (error) {
    next(error);
}
})

contactsRouter.post('/', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
        throw HttpError(400, "All fields empty");
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
}
catch (error) {
    next(error);
}
})

contactsRouter.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsService.deleteContactById(contactId);
    if (!result) {
        throw HttpError(404, 'Not found');
    }
    res.status(204).json({
        message: "Contact deleted"
    })
}
catch(error) {
    next(error);
}
})

contactsRouter.put('/:contactId', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
        throw HttpError(400, "All fields empty");
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }

    const { contactId } = req.params;

    const result = await contactsService.updateContactById(contactId, req.body);
    if (!result) {
        throw HttpError(404, 'Not found' );
    }

    res.status(200).json(result);
}
catch (error) {
    next(error);
}
})

export default contactsRouter;

