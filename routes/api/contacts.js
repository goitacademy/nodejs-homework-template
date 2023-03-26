const express = require('express');
const Joi = require('joi')
const contacts = require("../../models/contacts");
const HttpError = require('../../helpers/HttpError');

const router = express.Router()

const addContactsSchema = Joi.object({
  name: Joi.string().required().messages({
    "string.base": `"name" must be string`,
    "string.empty": `"name" cannot be empty`,
    "any.required": `missing required "name" field`,
  }),
  email: Joi.string().required().messages({
    "string.base": `"email" must be string`,
    "string.empty": `"email" cannot be empty`,
    "any.required": `missing required "email" field`,
  }),
  phone: Joi.string().required().messages({
    "string.base": `"phone" must be string`,
    "string.empty": `"phone" cannot be empty`,
    "any.required": `missing required "phone" field`,
  }),
})

router.get('/', async (req, res, next) => {
  try {
  const result = await contacts.listContacts();
    res.json(result)
  } catch (error) {
    next(error);
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    const { error } = addContactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
    // console.log(error);
  }
  catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res, next) => {
  // res.json({ message: 'template message' })
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, `Not found`);
    }

    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
})

router.put('/:id', async (req, res, next) => {
  try {
    const { error } = addContactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    } 
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(400, error.message);
    }
    res.json(result);
  } catch (error){
    next(error);
  }
  res.json({ message: 'template message' })
})

module.exports = router