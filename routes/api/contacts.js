const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'Hello message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'Hello message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'Hello message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'Hello message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'Hello message' })
})

module.exports = router
