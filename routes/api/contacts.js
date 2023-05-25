const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'some template message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'some template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'some template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'some template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'some template message' })
})

module.exports = router
