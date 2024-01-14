const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'ello World!' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router