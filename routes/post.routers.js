const express = require('express')

const router = express.Router()

router.post('/', async (req, res, next) => {
  res.json({ message: 'POST' })
})

module.exports = router