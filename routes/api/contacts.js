const express = require('express')
const Joi = require('joi')

const contacts = require("../../models/contacts")

// const {HttpError} = require("../../helpers")

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required().messages({
      "any.required": `"name" is required`,
      "string.empty": `"name" cannot be empty`,
      "string.base": `"name" must be string`
  }),
  email: Joi.string().required().messages({
      "any.required": `"email" is required`,
      "string.empty": `"email" cannot be empty`,
      "string.base": `"email" must be string`
  }),
  phone: Joi.string().required().messages({
    "any.required": `"phone" is required`,
    "string.empty": `"phone" cannot be empty`,
    "string.base": `"phone" must be string`
  }),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  }
  catch(error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.getContactById(id);
    if(!result) {
        return res.status(404).json({
          message: "Not found"
        })
    }
    res.status(200).json(result);
  }
  catch(error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
          message: "missing required name field"
        })
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch(error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if(!result) {
        return res.status(404).json({
          message: "Not found"
        })
    }
    return res.status(200).json({
      message: "contact deleted"
    })
  }
  catch(error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
        return res.status(400).json({
          message: "missing fields"
        })
    }
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result) {
        return res.status(404).json({
          message: "Not found"
        })
    }
    res.status(200).json(result);
  }
  catch(error) {
    next(error);
  }
})

module.exports = router
