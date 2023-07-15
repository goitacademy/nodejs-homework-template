import express from "express";
import HttpError from "../../helpers/HttpError.js";
import contactsService from '../../models/contacts.js';
import Joi from "joi";

const router = express.Router();

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.number().required()
}) 


router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  }
  catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
     throw HttpError(404, "Not found")
    }
    res.json(result)
  }
  catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      if (error.details[0].type === "any.required") {
        throw HttpError(400, `missing required ${error.details[0].path[0]} field`); 
      } else if (error.details[0].type.includes('base')) {
        throw HttpError(400, error.message); 
      }
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  }
  catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({ message: 'contact deleted' })
  }
  catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const keys = Object.keys(req.body);
    if (keys.length === 0) {
        throw HttpError(400, `missing fields`); 
    } else {
      const { error } = contactsSchema.validate(req.body);
      if (error) {
        if (error.details[0].type === "any.required") {
          throw HttpError(400, `missing required ${error.details[0].path[0]} field`);
        } else if (error.details[0].type.includes('base')) {
          throw HttpError(400, error.message); 
        }
      }
    } 
   const { contactId } = req.params;
   const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result);
  }
  catch (error) {
    next(error)
  }
 
})
export default router;
