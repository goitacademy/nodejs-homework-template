const express = require('express')

const Joi = require('joi')
const { HttpError } = require('../../helpers')

const contacts = require('../../models/contacts')
const router = express.Router()

const addSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: Joi.number().required()
})

router.get('/', async (req, res, next) => {
  try{
    const result = await contacts.listContacts();
    res.json(result);
  }
  catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  }
  catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, res.json({ message: "missing required name field" }))
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
})

router.delete('/:contactId', async (req, res, next) => {
      try {
        const {contactId} = req.params;
        const result = await contacts.removeContact(contactId);
        if(!result) {
            throw HttpError(404, "Not found");
        }
        res.status(200).json({
            message: "contact deleted"
        })
    }
    catch(error) {
        next(error);
    }
})

router.put('/:contactId', async (req, res, next) => {

    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, res.json({ message: "missing fields" }))
    }
    try {
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body )
            if(!result) {
            throw HttpError(404, "Not found");
        }
        res.json(result);
  } catch (error) {
    next(error);
  }
})

module.exports = router;
