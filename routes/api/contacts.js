const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message, GET' })
})

router.get('/:contactId', async (req, res, next) => {
  // res.json({ message: 'template message' })
  res.send(`<h1>Contact id: ${req.params.contactId}</h1>`);
  res.send(req);
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message, POST' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message, DELETE' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message, PUT' })
})

module.exports = router
