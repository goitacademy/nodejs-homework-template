const express = require('express')

const Joi = require ('joi');
const contactsService = require("../../models/contacts")

const {HttpError} = require("../../helpers")

const router = express.Router()

const contactAddSchema = Joi.object({
  name: Joi.string()
  .min(5)
  .max(30)
  .required()
  .messages({ "any.required": "missing required fields" }),
  email: Joi.string().email()
  .required().messages({ "any.required": "missing required fields" }),
  phone: Joi.string().pattern(
    /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/,
    { name: "numbers" }
  )
  .required().messages({ "any.required": "missing required fields" }),
})

router.get('/', async (req, res, next) => {
  try{  const result = await contactsService.listContacts();
    res.json(result)
  }
  catch(error){
next(error);
  }

})

router.get('/:id', async (req, res, next) => {
  try{
    const {id} = req.params;
    const result = await contactsService.getContactById(id);
    if(!result){
throw HttpError(404, `Movie with ${id} not found`)
    }
    res.json(result);
  }
  catch(error) {
    next (error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message)
    }
    const  result = await contactsService.addContact(req.body);
    res.status(201).json(result)
  }
  catch(error) {
    next (error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
const {id} = req.params;
const result = await contactsService.removeContact(id);
if(!result) {
  throw HttpError(404, `Movie with ${id} not found`)
}
res.json({
  message: "Delete success"
})
}
  catch(error) {
    next (error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body);
    if(error) {
      throw HttpError(400, error.message)
    }
    const {id} = req.params;
const result = await contactsService.updateContactById(id, req.body);
if(!result) {
  throw HttpError(404, `Movie with ${id} not found`)
}
res.json(result);
  }
  catch(error) {
    next(error)
  }
})

module.exports = router
