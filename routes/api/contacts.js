const express = require('express')

const router = express.Router()
const Joi = require("joi");
    const addSchema = Joi.object({
      name: Joi.string().min(3).max(30).required(),
      email: Joi.string()
        .required(),
      phone: Joi.string()
        .required(),
    });
const contactsOperations = require("../../models/contacts");



router.get('/', async (req, res, next) => {
  try {
    const result = await contactsOperations.listContacts();
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result)
  } catch(error) {
    next(error);
  }

})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsOperations.getContactById(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch(error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
     const {error} = addSchema.validate(req.body);
    if (error){
      error.status = 400;
      throw error;
     }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json(result);
  } catch(error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({message: "contact deleted"});
  } catch (error){
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error){
      error.status = 400;
      throw error;
     }
    const {id} = req.params;
    const result = await contactsOperations.updateContact(id, req.body);
    res.json(result);
  } catch(error) {
    next(error);
  }

})

module.exports = router
