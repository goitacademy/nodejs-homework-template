const express = require('express')
const { getContactById, listContacts, addContact, removeContact, updateContact } = require('../../models/contacts')

const router = express.Router()
const { addContactValidation, changeContactValidation } = require('../middlewares/validation')

router.get('/', async (_, res, next) => {
  try {
    const contactList = await listContacts()
    res.json({ contactList, status: 200 })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:contactId', async (req, res) => {
  const {contactId} = req.params;
  try {
    const contact = await getContactById(contactId)
    if (!contact) {
      return res.json({ message: "Not found", status: 404})
    }
    res.json({ contact, status: 200 })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', addContactValidation, async (req, res, next) => {
  try {
    const newContact = await addContact(req.body)
    res.json({ newContact, status: 200 })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await removeContact(contactId)
    if (data === null) {
      res.json({ "message": "Not found", status: 404})
    }
    res.json({ "message": "contact deleted", status: 200})
  } catch (error) {
    console.log(error)
  }
})

router.put('/:contactId', changeContactValidation, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await updateContact(contactId, req.body)
    if (updatedContact === null) {
      return res.json({ "message": "Not found", status: 404})
    }
    res.json({ updatedContact, status: 200})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
