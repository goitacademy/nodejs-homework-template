const express = require('express')

const contactsOperations = require("../../model/contacts");
const { contactsSchema } = require("../../validation");

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      contacts
    });
  }
  catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactsById(contactId);
    if (!contact) {
      return res.status(404).json({
        "message": 'Not found'
      });
    }
    res.json({
      contact
    })
  }
  catch(error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    // const { error } = contactsSchema.validate(req.body);
    // if (error) {
    //   return res.status(400).json({
    //     message: error.message
    //   })
    // }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      newContact
    })
  }
  catch(error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const removeContact = await contactsOperations.removeContact(contactId);
    if (!removeContact) {
      return res.status(400).json({
        "message": "Not found"
      })
    }
    res.json({
      removeContact
    })
  }
  catch(error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.message
      })
    }
    const { contactId } = req.params;
    const updateContact = await contactsOperations.updateContact(contactId, req.body);
    if (!updateContact) {
      return res.status(400).json({
        "message": "Not found"
      })
    }
    res.json({
      updateContact
    })
  }
  catch(error) {
    next(error)
  }
})

module.exports = router

    // "name": "Lois Lane",
    // "email": "lois-super@gmail.com,
    // "phone": "(323) 231-5678"