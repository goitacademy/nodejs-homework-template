const { json } = require('express')
const express = require('express')

const router = express.Router()
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts')
const { addContactSchema } = require('../../shemas/add-contact.shema')
const { updateContactSchema } = require('../../shemas/update-contact.schema')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts()
    res.json({ message: 'Here is all contacts', contacts, })
    res.status(200)
  } catch {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId)
    if (!contact) {
      res.status(404)
      res.json({ message: 'Not found' })
    } else {
      res.status(200)
      res.json({ message: 'Here is your desire contact', contact })
    }
  } catch {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  const body = req.body
  const { name, email, phone } = body
  const valid = addContactSchema.validate({ name, email, phone })
  if (valid.error) {
  res.status(400).json({message: "missing required name field", error: valid.error});
} else {
    await addContact(body)
    res.status(200).json({ message: "Your contact was successfully added" })
}
})

router.delete('/:contactId', async (req, res, next) => {
  const isSuccess = await removeContact(req.params.contactId)
  if (isSuccess === true) {
  res.status(200).json({message: "contact deleted"})
  } else {
    res.status(404).json({message: "Not found"})
  }
})

router.put('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  const body = req.body
  const { name, email, phone } = body
  const valid = updateContactSchema.validate({ name, email, phone })
  if (!body) {
    res.status(404).json({ message: "missing fields" })
  } else {
    const isSuccess = await updateContact(contactId, body)
    if (isSuccess === true) {
      res.status(200).json({ message: "contact updated" })
    } else {
      res.status(404).json({ message: "Not found" })
    }
  }
})

module.exports = router
