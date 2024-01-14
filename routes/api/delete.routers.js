const express = require('express')

const router = express.Router()

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'DELETE' })
})

module.exports = router