const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template ' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template ' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
