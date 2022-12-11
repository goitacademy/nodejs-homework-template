const express = require('express');
const contacts = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");

const { HttpError } = require("../../helpers");

const contactsSchema = Joi.object({
  email: Joi.string().required(),
  phone: Joi.string().required(),
  name: Joi.string().required(),
});


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result)
  } catch (error) {
    next(error)
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    console.log(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact(req.body);

    res.status(201).json(result)

  } catch (error) {
    next(error)
  }

})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not found")
    }
    res.json({
      message: "Contact was deleted"
    });
} catch (error) {
  next(error)
}
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message)
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found")
    }

    res.json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router;
