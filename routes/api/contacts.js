const express = require('express')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'Home work n done!' })
})

router.get('/:contactId', async (req, res, next) => {
  res.json({ message: 'Home work #2 done!' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'Home work #2 done!' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'Home work #2 done!' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'Home work #2 done!' })
})

module.exports = router
