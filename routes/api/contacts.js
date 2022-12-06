const express = require('express')

const contacts = require("../../models/index.js")

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const allContacts = await contacts.getAll()
    console.log(allContacts)
    res.json(allContacts)
  } catch (err) {
    res.status(500).json({
      message: "Server error"
    })
    res.send(err.message)
  }
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params
    const result = await contacts.getById(contactId)

    if (!result) {
      const err = new Error("Not found")
      err.status = 404
      
      throw err
    }

    return result
  } catch (err) {
    const {status = 500, message = "Server error" } = err
    res.status(status).json({message})
  }
  res.json({ message: 'contactID-get template message' })
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
