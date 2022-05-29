const express = require('express');
const router = express.Router();
const Joi = require('joi');

const operations = require('../../models/contacts');
const createErr = require('../../errors');

const schema = Joi.object({
  name: Joi.string().min(3).required(),
  phone: Joi.string().required(),
  email: Joi.string().email().required(),
})

router.get('/', async (req, res, next) => {
  try {
    const all = await operations.listContacts();
    res.json(all);
  } catch (e) {
    next(e);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await operations.getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" })
    }
    else {
      return res.json(contact)
    }
  } catch (e) {
    next(e);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = schema.validate(req.body);

    if (error) {
      throw createErr(400, error.message);
    }
    const newContact = await operations.addContact(name, email, phone);
    if (!newContact) {
      res.status(404).json({ message: "This name or number already exists" })

    } else {

      return res.status(201).json(newContact)
    }
  } catch (e) {
    next(e)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await operations.removeContact(contactId);

    if (!removeContact) {
      res.status(404).json({ message: "Not found" })
    } else {
      res.status(200).json({ "message": "contact deleted" })
    }
  } catch (e) {
    next(e);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { name, email, phone } = req.body;
    const { error } = schema.validate(req.body);
    if (error) {
      throw createErr(400, error.message);
    }

    const upadateContact = await operations.updateContact(contactId, name, email, phone)

    if (!upadateContact) {
      res.status(404).json({ message: "Not found" })
    } else {
      return res.json(upadateContact)
    }
  } catch (e) {
    next(e);
  }
})

module.exports = router
