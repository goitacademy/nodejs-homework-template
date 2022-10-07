const express = require('express')

const createError = require("http-errors")

const Joi = require("joi")

const contactOperation = require("../../models/contacts")

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactOperation.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    })
  }
  catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const contact = await contactOperation.getContactById(id);
    if (!contact) {
      throw createError(404, `Contact with ID: ${id} not found` )
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact
      }
    })

  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      error.message = "missing required name field"
      throw error;
    }
    const result =await contactOperation.addContact(req.body);
    console.log(result)
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
