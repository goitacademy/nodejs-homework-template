const express = require('express')
const Joi = require("joi");
const router = express.Router()
const { RequestError } = require("../../helpers");
const contacts = require("../../models/contacts");


const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});
router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oneContact = await contacts.getContactById(contactId);
    if (!oneContact) {
      throw RequestError(404, "Not found");
    }
    res.json(oneContact);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const allContacts = await contacts.listContacts();
    const { name, email, phone } = req.body;
    const isInList = allContacts.some(
      (item) =>
        item.name === name || item.email === email || item.phone === phone
    );
    if (isInList) {
      throw RequestError(400, "Already in list!");
    }
    const newEntry = await contacts.addContact(req.body);
    res.status(201).json(newEntry);
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);
    if (!updatedContact) {
      throw RequestError(404, "Not found");
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
})

module.exports = router
