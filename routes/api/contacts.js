const { json } = require('express');
const express = require('express');
const { NotFound, BadRequest } = require('http-errors');
const Joi = require('joi');

const productSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(), 
  phone: Joi.string().required(),
});

const router = express.Router()

const contactOperation = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactOperation.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts
      }
    }); 
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactOperation.getContactById(contactId);
    if(!result) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    }); 
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      throw new BadRequest({"message": "missing required name field"});
    }
    const result = await contactOperation.addContact(req.body);
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
  try {
    const { contactId } = req.params; 
    const result = await contactOperation.removeContact(contactId);
    if(!result) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        result
      }
    }); 
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = productSchema.validate(req.body);
    if (error) {
      throw new BadRequest({"message": "missing required name field"});
    } 
    const { id } = req.params; 
    const result = await contactOperation.updateContact(id, req.body);
    if(!result) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    }); 
  } catch (error) {
    next(error);
  }
})

module.exports = router
