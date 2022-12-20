const express = require('express');
const router = express.Router();
const Joi = require('joi');

const contactsSchema = Joi.object({
  name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
  
  email: Joi.string().email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] }
  }),

  phone: Joi.string().regex(/^[0-9]{10}$/).messages({'string.pattern.base': `Phone number must have 10 digits.`}).required(),
})

const contactsOperations = require("../../models/contacts");

router.get('/', async (req, res, next) => {
  try {    
    const contacts = await contactsOperations.listContacts()
    res.json({
      status: 'success',
      code: 200,
      result: {
        contacts
      },
  })
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      const error = new Error(`Product with id=${id} not found`);
      error.status = 404;
      throw error;     
    }
    res.json({
      status: 'success',
      code: 200,
      result: {
        result
      },
    })
  } catch (error) {
    next(error);      
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;  
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: 'success',
      code: 201,
      result: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
  
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw new NotFound(`Product with id=${id} not found`);
    }
    res.json({
      status: 'success',
      code: 200,
      result: {
        result
      },
    })
  } catch (error) {
    next(error)
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;  
    }
    const { id } = req.params;
    const result = await contactsOperations.updateById(id, req.body);
    if (!result) {
      const error = new Error(`Product with id=${id} not found`);
      error.status = 404;
      throw error;     
    }
    res.json({
      status: 'success',
      code: 200,
      result: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

module.exports = router
