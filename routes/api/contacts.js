const express = require('express')
const contacts = require('../../models/contacts')
const path = require("path");
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts()
    res.json(result)
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    })
  }
  
})

router.get('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    const result = await contacts.getContactById(id)
    if (!result) {
      res.status(404).json({
      message:"Not found"
      })
    }
    res.json(result)
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    })
  }
  
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
