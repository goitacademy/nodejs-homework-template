const express = require('express')
const router = express.Router()
const ERROR_MESSAGES = require('../../constants/index.js')
const Contact = require('../../model/contact.js')

router.get('/', async (req, res, next) => {
  const contactList = await Contact.find()
  res.status(200).json(contactList)
})

router.get('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId

  Contact.findOne({ _id: contactId })
    .then((foundContact) => {
      if (!foundContact) {
        return res.status(404).json({
          message: ERROR_MESSAGES.NOT_FOUND,
        })
      }

      res.status(200).json({ found_contact: foundContact })
    })
    .catch((error) => res.status(400).json({ error: error }))
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: ERROR_MESSAGES.MISSING_FIELD,
    })
  }

  try {
    const newContact = new Contact({ name, email, phone })
    const updateContact = await newContact.save()

    res.status(201).json({
      new_contact: updateContact,
    })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId

  Contact.findOneAndDelete({ _id: contactId })
    .then((foundContact) => {
      if (!foundContact) {
        return res.status(404).json({ message: ERROR_MESSAGES.NOT_FOUND })
      }

      res.json({
        found_contact: foundContact,
        message: `Contact with ID=${contactId} deleted successfully!`,
      })
    })
    .catch((error) => res.status(400).json({ error: error }))
})

router.patch('/:contactId', async (req, res, next) => {
  const contactId = req.params.contactId
  const newFields = req.body
  const { name, email, phone } = newFields

  if (!name || !email || !phone) {
    return res.status(400).json({
      message: ERROR_MESSAGES.MISSING_FIELD,
    })
  }

  Contact.findOneAndUpdate(
    { _id: contactId },
    { $set: newFields },
    { new: true, useFindAndModify: false },
  )
    .then(foundContact => {
      if (!foundContact) {
        return res
          .status(404)
          .json({ message: ERROR_MESSAGES.NOT_FOUND })
      }

      res.json({ found_contact: foundContact })
    })
    .catch(error => res.status(400).json({ error: error }))
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  const contactId = req.params.contactId
  const newFields = req.body
  const { favorite } = newFields

  if (!favorite) {
    return res.status(400).json({
      message: 'missing field favorite',
    })
  }

  Contact.findOneAndUpdate(
    { _id: contactId },
    { $set: newFields },
    { new: true, useFindAndModify: false },
  )
    .then(foundContact => {
      if (!foundContact) {
        return res
          .status(404)
          .json({ message: ERROR_MESSAGES.NOT_FOUND })
      }

      res.json({ found_contact: foundContact })
    })
    .catch(error => res.status(400).json({ error: error }))
})

module.exports = router
