const express = require('express')
const Joi = require("joi");
const contacts = require("../../models/contacts");

const router = express.Router();

const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`
  }),
  email: Joi.string().required().messages({
    "any.required": `"email" is required`,
    "string.empty": `"email" cannot be empty`
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is required`,
    "string.empty": `"phone" cannot be empty`
  }),
})

router.get('/', async (req, res, next) => {
  try{
    const result = await contacts.listContacts();
    res.json(result);
  } catch(error){
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try{
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result){
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch(error){
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try{
    const {error} = addSchema.validate(req.body);
    if(error){
        throw HttpError(400, "Miising name field");
    }
    const result = await contacts.addContact(req.body);
        res.status(201).json(result);
        res.json(result);
  } catch(error){
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try{
    const {contactId} = req.params;
        const result = await contacts.removeContact(contactId);
        if(!result){
            throw HttpError(404, `Not found`);
        }
        res.json({
          message: "Delete success"
      })
  } catch(error){
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error){
        throw HttpError(400, "Missing name field");
    }
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result){
        throw HttpError(404, `Not found`);
    }
    return res.json(result);
  } catch(error){
    next(error);
  }

})

module.exports = router
