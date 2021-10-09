const express = require('express')
const router = express.Router()

const controlContacts = require('../../model/index')

router.get('/', async (req, res, next) => {
  const data = await controlContacts.listContacts()
  res.json(data)
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  const data = await controlContacts.getContactById(contactId)
  data ? res.json(data) : res.status(404).json({ message: 'Not found' })
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body

  if (!name.trim().length || !email.trim().length || !phone.trim().length) {
    res.status(400).json({ message: 'missing required name field' })
    return
  }

  const updateData = await controlContacts.addContact(req.body)
  res.status(201).json(updateData)
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params

  const data = await controlContacts.removeContact(contactId)
  data.status === 200
    ? res.status(200).json({ message: 'contact deleted' })
    : res.status(400).json({ message: 'Not found' })
})

router.patch('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  const updateItems = {}
  const obj = Object.keys(req.body)
  if (obj.length === 0) {
    res.status(400).json({ message: '"missing fields"' })
    return
  }
  for (const key of obj) {
    if (req.body[key].trim().length !== 0) updateItems[key] = req.body[key]
  }

  const data = await controlContacts.updateContact(contactId, updateItems)
  data
    ? res.status(200).json(data)
    : res.status(404).json({ message: 'Not found' })
})

// const sendResponse = (status, message) => {

// }

module.exports = router
