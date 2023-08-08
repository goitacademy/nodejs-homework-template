const express = require('express');
const Joi = require("joi");

const contacts = require('../../models/contacts');

const {HttpError} = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const addPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
})

router.get('/', async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  }
  catch(error) {
      next(error)
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch(error) {
      next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch(error) {
      next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {id} = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(204).json({
        message: "Delete success"
    })
  }
  catch(error) {
      next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = addPutSchema.validate(req.body);
    if (error) {
        throw HttpError(400, error.message);
    }
    const {id} = req.params;
    const result = await contacts.updateContact(id, req.body);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
  catch(error) {
      next(error)
  }
})

module.exports = router;
