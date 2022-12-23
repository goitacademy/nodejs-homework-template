const express = require('express')
const { getContactById, listContacts, addContact, removeContact, updateContact } = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
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
    // console.log(contact)
    if (!contact) {
      return res.json({ message: "Not found", status: 404})
    }
    res.json({ contact: contact, status: 200 })
  } catch (error) {
    console.log(error)
  }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    if (!name || !email || !phone) {
    return res.json({"message": "missing required ... field", status: 400})
  } else {
    const newContactList = await addContact(req.body)
    res.json({ contactList: newContactList, status: 200 })
  }
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const newContactList = await removeContact(contactId)
    if (newContactList === null) {
      res.json({ "message": "Not found", status: 404})
    }
    res.json({ "message": "contact deleted", status: 200})
  } catch (error) {
    console.log(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    if (!req.body) {
      return res.json({ "message": "missing fields", status: 400})
    }
    const updatedContact = await updateContact(contactId, req.body)
    res.json({ updatedContact, status: 200})
  } catch (error) {
    console.log(error)
  }
})

module.exports = router
