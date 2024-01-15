const express = require('express')

const contactSchema = require("../../schemas/contact")
const { listContacts, getContactById, addContact, removeContact, updateContact } = require("../../models/contacts")

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data)
  } catch (error) {
    next(error);
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const data = await getContactById(req.params.contactId)
    if (data.length === 0) {
      next()
    }
    res.json(data)
  } catch (error) {
    next(error)
  }

})

router.post('/', async (req, res, next) => {
  try {
    const validatedData = contactSchema.validate(req.body)
    if (typeof validatedData.error !== "undefined") {
      res.status(400).json({ "message": "missing required name field" })
      return
    }
    const newContact = await addContact(validatedData.value)
    res.status(201).send(newContact)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const data = await removeContact(req.params.contactId)
    if (!data) {
      res.status(404).json({ "message": "Not found" })
      return
    }
    res.status(200).json({ "message": "contact deleted" });
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name && !email && !phone) {
      res.status(400).json({ "message": "missing fields" });
      return;
    }
    const data = await updateContact(req.params.contactId, req.body);

    if (!data) {
      res.status(404).json({ "message": "Not found" })
    }
    res.status(200).json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
