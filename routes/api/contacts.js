const express = require('express');
const Joi = require("joi");
const addSchema = Joi.object({
  name: Joi.string().required().messages({
      'string.base': `"name" should be a type of 'text'`,
      'string.empty': `"name" cannot be an empty field`,
      'any.required':  "missing required name field"
  }),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().messages({
      'any.required':  "missing required name field"
  }),
  phone: Joi.string().required().messages({
      'any.required':  "missing required name field"
  }),
});

const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // res.status(500).json({                                             --- | залишив для приклада!
    //   message:error.message,
    // })
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
      // ------------------
      // const error = new Error(`Contacts with ${contactId} not found`); --- | залишив для приклада!
      // error.status = 404;
      // console.log("ITS ME ERROR! -- ",error);
      // throw error;
      // --------------
      // return res.status(404).json({
      //   message:`Contacts with ${contactId} not found`,
      // })
    }
    res.json(result);
  } catch (error) {
    next(error);
    // const { status = 500, message = "Server error" } = error;          --- | залишив для приклада!
    // res.status(status).json({
    //   message,
    // })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId,req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
