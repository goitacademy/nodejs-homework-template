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
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
