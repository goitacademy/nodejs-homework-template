const express = require('express')
const router = express.Router()
const contacts = require("../../models/contacts/contacts");
const { HttpError } = require("../../helpers")
// const Joi = require("joi");

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result)
  }catch (error) {
    next(error);
   }

})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result)
  } catch(error) {
    next(error);
  }
})


router.post('/', async (req, res, next) => {
  try {
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
   }catch(error) {
    next(error);
   }
})

/* router.delete('/:contactId', async (req, res, next) => {
})

router.put('/:contactId', async (req, res, next) => {
}) */

module.exports = router
