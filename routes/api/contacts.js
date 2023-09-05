const express = require('express');
const Joi = require('joi');
const {getContactById, listContacts, removeContact, updateContactById, addContact} = require("../../models/contacts");
const HttpError = require('../../helpers/HttpError');


const router = express.Router();

const movieAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  console.log(req.body);
  try {
    const {error} = movieAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const {name, email, phone} = req.body;
    const result = await addContact(name, email, phone);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await removeContact(contactId);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found`);
    }
    res.json({
      message: "Delete success"
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = movieAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const {contactId} = req.params;
    const result = await updateContactById(contactId, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id ${contactId} not found`);
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router
