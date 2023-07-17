import express from "express";
import Joi from "joi";

import contactsService from "../../models/contacts.js";
import { HttpError } from "../../helpers/index.js";

const contactsRouter = express.Router();

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required "name" field`,
    }),
    email: Joi.string().required().messages({
        "any.required": `missing required "email" field`,
    }),
    phone: Joi.string().required().messages({
        "any.required": `missing required "phone" field`,
    }),
})

contactsRouter.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result)
  }
  catch (error) {
    next(error);
  }

})

contactsRouter.get('/:id', async (req, res, next) => {
  try {
        const { id } = req.params;
        const result = await contactsService.getContactById(id);
        if (!result) {
            throw HttpError(404, `Not found`);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
})

contactsRouter.post('/', async (req, res, next) => {
  try {
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

contactsRouter.delete('/:id', async (req, res, next) => {
  try {
        const { id } = req.params;
        const result = await contactsService.removeContact(id);
        if (!result) {
            throw HttpError(404, `Not found`);
        }

        res.json({
            message: "Contact deleted"
        })
    }
    catch (error) {
        next(error);
    }
})

contactsRouter.put('/:id', async (req, res, next) => {
  try {
        const { error } = contactAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, error.message);
        }
        const { id } = req.params;
        const result = await contactsService.updateContactById(id, req.body);
        if (!result) {
            throw HttpError(404, `Not found`);
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
})

export default contactsRouter;
