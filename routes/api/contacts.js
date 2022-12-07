const express = require('express')

const contacts = require("../../models/contacts.json")

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json(contacts)
})

router.get('/:contactId', async (req, res, next) => {
  res.json(contacts)
})

router.post('/', async (req, res, next) => {
  res.json(contacts)
})

router.delete('/:contactId', async (req, res, next) => {
  res.json(contacts)
})

router.put('/:contactId', async (req, res, next) => {
  res.json(contacts)
})

module.exports = router
