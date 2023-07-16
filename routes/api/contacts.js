import express from "express";
import contactsService from "../../models/contacts.js";
import Joi from "joi";

const router = express.Router()

const contactAddSchema = Joi.object({
    name: Joi.string().required().messages({
        "any.required": `missing required name field`,
    }),
  email: Joi.string().required(),
    phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
        const result = await contactsService.listContacts();
        res.json(result);
    }
    catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res, next) => {
  try {
        const { id } = req.params;
        const result = await contactsService.getContactById(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
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

router.delete('/:id', async (req, res, next) => {
  try {
        const { id } = req.params;
        const result = await contactsService.removeContact(id);
        if (!result) {
            throw HttpError(404, "Not found");
        }

        res.json({
            message: "contact deleted"
        })
    }
    catch (error) {
        next(error);
    }
})

router.put('/:id', async (req, res, next) => {
  try {
        const { error } = contactAddSchema.validate(req.body);
        if (error) {
            throw HttpError(400, "missing fields");
        }
        const { id } = req.params;
        const result = await contactsService.updateContact(id, req.body);
        if (!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
    }
    catch (error) {
        next(error);
    }
})

export default router;