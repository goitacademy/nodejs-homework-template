const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'HW-02 message' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'HW-02 message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'HW-02 message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'HW-02 message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'HW-02 message' })
})

module.exports = router
