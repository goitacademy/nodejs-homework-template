const express = require('express')
const { getContactById, getContacts, addContact, removeContact, updateContact } = require('../../models/contacts')

const router = express.Router()
const { addContactValidation, changeContactValidation } = require('../middlewares/validation')

router.get('/', async (_, res, next) => {
  try {
    const contactList = await getContacts()
    res.json({ contactList })
  } catch (error) {
    console.log(error)
  }
})

router.get('/:contactId', async (req, res) => {
  const {contactId} = req.params;
  try {
    const contact = await getContactById(contactId)
    if (!contact) return res.sendStatus(404)
    res.json({ contact })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', addContactValidation, async (req, res, next) => {
  try {
    const newContact = await addContact(req.body)
    res.status(201).json({ newContact })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await removeContact(contactId)
    if (data === null) return res.sendStatus(404)
    res.json({ "message": "contact deleted" })
  } catch (error) {
    console.log(error)
  }
})

router.put('/:contactId', changeContactValidation, async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const updatedContact = await updateContact(contactId, req.body)
    if (updatedContact === null) return res.sendStatus(404)
    res.json({ updatedContact })
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
