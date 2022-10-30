const express = require('express')
const contacts = require("../../models/contacts");

const schemaPut = require('./validatePut')
const validatePost = require('./validatePost')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(await contacts.listContacts())
})

router.get(`/:contactId`, async (req, res, next) => {
  const id = req.params.contactId;
  if (await contacts.getContactById(id) === null) {
    res.status(404).json({ message: "Not found" })
  }
  if (await contacts.getContactById(id) !== null) {
    res.status(200).json(await contacts.getContactById(id))
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.query;
  if (name !== undefined && email !== undefined && phone !== undefined) {
    try {
      const value = await validatePost.validateAsync({ name, email, phone });
      console.log(value)
      res.status(201).json(await contacts.addContact(value))
    }
    catch (err) { 
      res.status(404).json({ "message": err.details.map(e =>  e.message)})
    }
    
  } else {
    res.status(400).json({"message": "missing required name field"})
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  if (id !== undefined) {
    res.status(200).json({"message": "contact deleted"})
    await contacts.removeContact(id)
  } else {
    res.status(404).json({ "message": "Not found" })
  }
})

router.put('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const { name, email, phone } = req.query;
  if (name !== undefined || email !== undefined || phone !== undefined) {
    try {
      const value = await schemaPut.validateAsync({ name, email, phone });
      const reply = await contacts.updateContact(id, value)
      if (reply !== null) {
        res.status(200).json(reply)
      } else {
        res.status(404).json({"message": "Not found"})
      }
    }
    catch (err) { 
      res.status(404).json({ "message": err.details.map(e =>  e.message)})
    }
  } 
  if (name === undefined && email === undefined && phone === undefined) { 
    res.status(400).json({ "message": "missing fields" })
  } 
})


module.exports = router
