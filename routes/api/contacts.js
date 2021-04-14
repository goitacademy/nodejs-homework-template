const express = require('express')
const router = express.Router()
const actions = require('../../model')

router.get('/', async (req, res, next) => {
  const data = await actions.listContacts()
  try {
    res.status(200).json({
      data,
      message: 'data loaded'
    })
  } catch (err) {
    res.status(400).json({
      message: 'data is empty'
    })
  }
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
