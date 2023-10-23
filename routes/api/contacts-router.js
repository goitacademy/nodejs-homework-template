import express from 'express';

import contactsService from "../../models/contacts.js";
import { HttpError } from '../../helpers/index.js';
import Joi from 'joi';


const router = express.Router()

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": "missing required name field",
    }),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
        "any.required": "missing required email field",
    }),
    phone: Joi.string().required().messages({
        "any.required": "missing required phone field",
    }),
})

const contactUpdateSchema = Joi.object({
    name: Joi.string(),
    email: Joi.string().email(),
    phone: Joi.string(),
}).or("name", "email", "phone");


router.get('/', async (req, res, next) => {
    try {
        const result = await contactsService.listContacts();
        res.json(result);

    } catch (error) {
        next(error);

    }

})



router.get('/:contactId', async (req, res, next) => {
    try {
        const { contactId } = req.params;

        const result = await contactsService.getContactById(contactId);
        if (!result) {
            throw HttpError(404, `Contact with id: ${contactId}  not found`);
        }
        res.json(result);

    } catch (error) {
        next(error);

    }

})



router.post('/', async (req, res, next) => {
    try {

        if (!Object.keys(req.body).length) {
            throw HttpError(400, "Missing required  fields")
        }

        const { error } = contactAddSchema.validate(req.body);

        if (error) {
            throw HttpError(400, error.message)
        }

        const result = await contactsService.addContact(req.body);
        res.status(201).json(result);

    } catch (error) {
        next(error);

    }

})



router.delete('/:contactId', async (req, res, next) => {

    try {
        const { contactId } = req.params;

        const result = await contactsService.removeContact(contactId);
        if (!result) {
            throw HttpError(404, `Contact with ${contactId} not found`)
        }
        res.json({
            message: "Contact deleted"
        })
    } catch (error) {
        next(error);
    }
})



router.put('/:contactId', async (req, res, next) => {

    try {
        const { contactId } = req.params;
        if (!Object.keys(req.body).length) {
            throw HttpError(400, "missing fields")
        }

        const { error } = contactUpdateSchema.validate(req.body);

        if (error) {
            throw HttpError(400, error.message)
        }


        const result = await contactsService.updateContact(contactId, req.body);
        if (!result) {
            throw HttpError(404, `Contact with ${contactId} not found`)
        }

        res.status(200).json(result);

    } catch (error) {
        next(error);
    }

})

export default router;