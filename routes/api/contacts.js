const express = require('express');
const Joi = require("joi");
const contacts = require("../../models/contacts");

const contactAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required().email(),
  phone: Joi.string().required()
})

const router = express.Router()

/* весь список контактів */

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
      next(error);
  }
})

 /* контакт по id */ 

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.getContactById(id);
    if(!result) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch(error) {
     next(error)
  }
    })

  /* додавання контакту */ 

router.post('/', async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body);
    if(error) {
      const error = new Error("Missing required name field"); 
      error.status = 400;
      throw error;
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  } 
})

/* видалення контакту */ 

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if(!result) {
      const error = new Error("Not found"); 
      error.status = 404;
      throw error;
    }
    res.json({
      message: "Contact deleted",
    }) 
  }  catch (error) {
    next(error);
  }
})

/* оновлення контакту */ 

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body);
    if(error) {
      const error = new Error("Missing fields"); 
      error.status = 400;
      throw error;
    }
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result) {
      const error = new Error("Not found"); 
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
      next(error);
  }
})

module.exports = router
