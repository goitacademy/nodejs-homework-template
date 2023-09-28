import express from "express";
import Joi from "joi";

import * as contactsService from "../../models/contacts.js"
import httpError  from "../../helpers/httpError.js"

const router = express.Router()

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result)
  } catch (error){
    next(error)
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(contactId)
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw httpError(404, "Not found")
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw httpError(400, "missing required name field")
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message)
    }

    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);

  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw httpError(404, "Not found")
    }
    res.json({message: "contact deleted"})
  } 
  catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
     if (!Object.keys(req.body).length) {
      throw httpError(400, "missing fields")
    }

    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message)
    }

    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);

    if (!result) {
      throw httpError(404, "Not found")
    }
    res.json(result);

  } catch (error) {
    next(error)
  }
  
})

export default router;