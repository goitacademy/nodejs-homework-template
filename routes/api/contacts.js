const express = require('express');
const router = express.Router();
const Joi = require("joi");

const { listContacts, addContact, getContactById, removeContact, updateContact } = require('../../models/contacts');
const { HttpError } = require("../../helpers")

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json({ 
      status: "success",
      code: 200,
      data: {result},
    })
  } catch (er) {
    next(er);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({ 
      status: "success",
      code: 200,
      data: {result},
    })
  } catch (er) {
    next(er);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {body} = req;
    const {error} = addSchema.validate(body);
    if (error) {
      throw HttpError(404, "Not found")
    }
    const result = await addContact(body);
    res.json({ 
      status: "created",
      code: 201,
      data: {result},
    })
  } catch (er) {
    next(er);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({ 
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {result},
    })
  } catch (er) {
    next(er);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const {body} = req;
    const {error} = addSchema.validate(body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: error.message,
      }) 
    }
    const result = await updateContact(id, body);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({ 
      status: "success",
      code: 200,
      message: "contact updated",
      data: {result},
    })
  } catch (er) {
    next(er);
  }
})

module.exports = router;
