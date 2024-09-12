const { json } = require('express')
const express = require('express')
const { ContactModel } = require('../../database/models/contacts.models')

const router = express.Router()
const { listContacts, getContactById, removeContact, addContact, updateContact } = require('../../models/contacts')
const { addContactSchema, updateContactSchema } = require('../../shemas')


router.get('/', async (req, res, next) => {
  try {
    const contacts = await ContactModel.find()
    res.json({ message: 'Here is all contacts', contacts, })
    res.status(200)
  } catch {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  try {
    const contact = await ContactModel.findOne({ _id: id })
    if (!contact) {
      res.status(404)
      res.json({ message: 'Not found' })
    } else {
      res.status(200)
      res.json({ message: 'Here is your desire contact', contact })
    }
  } catch {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body
  
    const newContact = await ContactModel.create({ name, email, phone })
    res.status(200).json({ message: "Your contact was successfully added" })
  } catch {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  const delContact = await ContactModel.findByIdAndRemove({ _id: id })
  if (delContact) {
  res.status(200).json({message: "contact deleted", delContact})
  } else {
    res.status(404).json({message: "Not found"})
  }
})

router.put('/:contactId', async (req, res, next) => {
  const id = req.params.contactId
  const body = req.body
  const { name, email, phone } = body
  if (!body) {
    res.status(404).json({ message: "missing fields" })
  } else {
    const isSuccess = await ContactModel.findByIdAndUpdate({ _id: id }, { name, email, phone }, { new: true });
    if (isSuccess) {
      res.status(200).json({ message: "contact updated" })
    } else {
      res.status(404).json({ message: "Not found" })
    }
  }
})

router.patch('/:contactId/favorite', async (req, res, next) => {
  const id = req.params.contactId
  const body = req.body
  const { favorite } = body
  if (!body) {
    res.status(404).json({ message: "missing fields favorite" })
  } else {
    const changedContact = await ContactModel.findByIdAndUpdate({ _id: id }, { favorite }, { new: true });
    if (changedContact) {
      res.status(200).json({ message: "Now is favorite", changedContact})
    } else {
      res.status(404).json({ message: "Not found" })
    }
  }
})

module.exports = router
