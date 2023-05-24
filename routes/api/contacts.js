const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'Hello message delivered' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'Hello message delivered' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'Hello message delivered' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'Hello message delivered' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'Hello message delivered' })
})

module.exports = router
