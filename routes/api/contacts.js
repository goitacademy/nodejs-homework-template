const express = require('express')

const router = express.Router()

const contacts = require('../../models/contacts')

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts()
  res.json(result)
})

router.get('/:contactId', async (req, res, next) => {
    const result = await contacts.getContactById('qdggE76Jtbfd9eWJHrssH')
  res.json(result)
})

router.post('/', async (req, res, next) => {
  const result = await contacts.addContact({ name: 'Stanislav', email: 'pr', phone: '45' })
  res.json(result)
})

router.delete('/:contactId', async (req, res, next) => {
  const result = await contacts.removeContact("uBOr5u4WwWe8bW9QK_EMA")
  res.json(result)
})

router.put('/:contactId', async (req, res, next) => {
  const result = await contacts.updateContact("e6ywwRe4jcqxXfCZOj_1")
  res.json(result)
})

module.exports = router
