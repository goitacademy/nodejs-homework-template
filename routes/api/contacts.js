const express = require('express')
const contactFuncs = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactFuncs.listContacts()
  res.json(
    { message: 'Success', code: 200, data: contacts })
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await contactFuncs.getContactById(contactId)
  if (contactById === null) {
    res.status(404).json({ message: 'Not found', code: 404 })
  } else { res.json({ message: 'Success', code: 200, data: contactById }) }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  console.log(req.body)
  if (name === undefined || email === undefined || phone === undefined) {
    res.status(400).json({ message: 'Missing required field', code: 400 })
    return
  }
  const newContact = await contactFuncs.addContact({ email, name, phone })

  res.status(201).json({ message: 'Contact added', code: 201, data: newContact })
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contactFuncs.removeContact(contactId)

  if (deletedContact === null) {
    res.status(404).json({ message: 'Not found', code: 404 })
  } else { res.json({ message: 'Contact deleted', code: 200, data: deletedContact }) }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  if (req.body === {}) {
    res.status(400).json({ message: 'Missing fields', code: 400 })
    return
  }

  const updatedContact = await contactFuncs.updateContact(contactId, req.body)

  if (updatedContact === null) {
    res.status(404).json({ message: 'Not found', code: 404 })
  } else { res.json({ message: 'Contact updated', code: 200, data: updatedContact }) }
})

module.exports = router
