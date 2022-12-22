const express = require('express');
const createError = require('http-errors');
const Joi = require("joi");

const {products: ctrl}=require('../../controllers')

const contactSchema = Joi.object({
  name: Joi.required(),
  email: Joi.required(),
  phone: Joi.required()
})

const contactsOperations = require("../../models/contacts")

const router = express.Router()

router.get('/', ctrl.getAll);

router.get('/:contactId', ctrl.getById)

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result  = await contactsOperations.removeContact(id);
    if (!result ) {
      throw createError(404, `Contact with id=${id} not found`)
    }
    res.json({
      status: 'success',
      code: 200,
      message: 'contact deleted',
      data: {
        result 
      }
    })
  } catch (error) {
    next(error);
  }
})



router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
      const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, `Contact with id=${contactId} not found`)
      }
    res.json({
      status: 'success',
      code: 200,
      data: {
        result
      }
    })

  } catch (error) {
    next(error)
  }
})

module.exports = router
