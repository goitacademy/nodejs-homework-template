const express = require('express')

const router = express.Router()

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'PUT' })
})

module.exports = router