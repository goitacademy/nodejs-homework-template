const express = require('express')

const router = express.Router()
const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact} = require('../../models/contacts')
router.get('/', async (req, res, next) => {
  res.json(listContacts())
})

router.get('/:contactId', async (req, res, next) => {
  res.json(getContactById())
})

router.post('/', async (req, res, next) => {
  res.json(updateContact())
})

router.delete('/:contactId', async (req, res, next) => {
  res.json(removeContact())
})

router.put('/:contactId', async (req, res, next) => {
  res.json(addContact())
})

module.exports = router
