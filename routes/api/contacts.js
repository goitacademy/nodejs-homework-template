const express = require('express')
const Joi = require('joi')

const contacts = require("../../models/contacts")

// const {HttpError} = require("../../helpers")

const router = express.Router()

const addSchema = Joi.object({
  name: Joi.string().required().messages({
      "any.required": `"name" is required`
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
  // Joi.string().pattern(//)
})

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    // res.json(result);
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
        // throw HttpError(404, "Not found");
        // const error = new Error(`Book with ${id} not found`);
        // error.status = 404;
        // throw error;
        return res.status(404).json({
          message: "Not found"
        })
    }
    // res.json(result);
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
        // throw HttpError(400, error.message);
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
        // throw HttpError(404, `Book with ${id} not found`);
        return res.status(404).json({
          message: "Not found"
        })
    }
    // res.status(204).send()
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
        // throw HttpError(400, error.message);
        return res.status(400).json({
          message: "missing fields"
        })
    }
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result) {
        // throw HttpError(404, `Book with ${id} not found`);
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
