const express = require('express')

const contactsOperations = require('../../models/contacts')

const router = express.Router()

const Joi = require("joi");

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: 'success',
      code: 200,
      data: {
        result: contacts
      }
    });

  } catch (error) {
    next(error);
  };
});


router.get('/:id', async (req, res, next) => {
  try {
    const {id}  = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      const error = new Error(`Not found contact with id=${id}`);
      error.status = 404;
      throw error;
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
});


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
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
      if (!result) {
      const error = new Error(`Not found contact with id=${id}`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: 'success',
      code: 200,
      message: "contact deleted",
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
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
    const result = await contactsOperations.updateContact(id, req.body);
    if (!result) {
      const error = new Error(`Not found contact with id=${id}`);
      error.status = 404;
      throw error;
    }
    
    res.json({
        status: 'success',
      code: 201,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
    
  }
})

module.exports = router
