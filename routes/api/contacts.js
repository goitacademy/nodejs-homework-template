const express = require('express');
const contacts = require('../../models/contacts');
const router = express.Router();
const Joi = require('joi');

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required()
})


router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  }
  catch (err){
    next(err);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    
    if (!result) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.json(result);
  }
  catch (err) {
    next(err);
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      res.status(400).json({ message: "missing required name field" });
      return
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  }
  catch (err){
    next(err);
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    
    if (!result) {
      res.status(404).json({ message: "Not found" });
      return
    }

    res.status(200).json({ message: "Contact deleted" })
  }
  catch (err){
    next(err);
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = contactSchema.validate(req.body);
    
    if (error) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);

    if (!result) {
      res.status(404).json({ message: "Not found" });
      return;
    }

    res.status(200).json(result);
  }
  catch (err) {
    next(err)
  }
})

module.exports = router
