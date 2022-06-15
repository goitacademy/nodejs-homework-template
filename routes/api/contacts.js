const express = require('express');
const createError = require("http-errors");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const contactsScheme = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required(),
  phone: Joi.string().required()
})

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    console.log(contacts);
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
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw createError(404, "Not found")
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsScheme.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const result = await addContact(req.body);
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
    const { id } = req.params;
    const result = await removeContact(id);
    if (!result) {
      throw createError(404, "Not found")
    }

    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsScheme.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);
    if (!result) {
      throw createError(404, "Not found")
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result
      }
    })

  } catch (error) {
    
  }
})

module.exports = router;
