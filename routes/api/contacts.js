
const express = require('express');
const contacts = require("../../models/contacts");
const router = express.Router();
const {HttpError} = require("../../helpers");
const Joi = require("joi");


const addSchema = Joi.object({
  name: Joi.string().required().messages({
      "any.required": `"name" must be exist`,
      "string.base": `"name" must be string`,
      "string.empty": `"name" cannot be empty`
  }),
  email: Joi.string().required().messages({
      "any.required": `"email" must be exist`,
      "string.base": `"email" must be string`,
      "string.empty": `"email" cannot be empty`
  }),
  phone: Joi.string().required().messages({
    "any.required": `"number" must be exist`,
    "string.base": `"number" must be string`,
    "string.empty": `"number" cannot be empty`
}),
})

router.get('/', async (req, res, next) => {

  
try {
  const result = await contacts.listContacts();
  res.json(result)
} catch (error) {
  next(error)
}

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contacts.getContactById(contactId);
    if(!result){
      throw HttpError(404);

    }
  res.json(result)
  } catch (error) {
    next(error)
  }
  
})

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const {contactId} = req.params;
  const result = await contacts.removeContact(contactId);
  if(!result){
    throw HttpError(404, `Book with ${contactId} not found`);
  }
  res.json({ message: 'Complete' })
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
         throw HttpError(400, error.message)
    }
    const {contactId} = req.params;
    const result = await contacts.updateById(contactId, req.body);
    if(!result) {
        throw HttpError(404);
    }

    res.json(result);
  } catch (error) {
    next(error)
  }
  res.json({ message: 'template message' })
})

module.exports = router;
