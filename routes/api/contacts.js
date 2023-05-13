const express = require('express');
const router = express.Router();
const {HttpError} = require("../../helpers");
const Joi = require("joi");

const users = require("../../models/contacts")

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await users.listContacts()
    res.json(result)
  } catch(error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await users.getContactById(contactId)
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result)
  } catch(error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body)
    if(error) {
      throw HttpError(400, error.message);
    }
    const result = await users.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await users.removeContact(contactId)
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted"
    })
  } catch (error) {
    next(error);
  }

})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body)
    if(error) {
      throw HttpError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await users.updateContact(contactId, req.body);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
