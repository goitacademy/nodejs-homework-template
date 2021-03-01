const express = require('express')
const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.get('/:contactId', async (req, res, next) => {
  try {
    res.json({ message: 'template message' })
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    res.json({ message: 'template message' })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    res.json({ message: 'template message' })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId', async (req, res, next) => {
  try {
    res.json({ message: 'template message' })
  } catch (error) {
    next(error)
  }
})

module.exports = router
