const express = require('express')

const router = express.Router()

router.patch('/', async (req, res, next) => {
  res.json({ message: 'PATCH' })
})
module.exports = router