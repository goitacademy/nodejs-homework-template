const express = require('express')
const contactFuncs = require('../../models/contacts')
const controllers = require('../controllers/controllers')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactFuncs.listContacts()
  res.json(
    controllers.twoHundred(contacts))
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await contactFuncs.getContactById(contactId)
  if (contactById === null) {
    res.status(404).json(controllers.fourZeroFour())
  } else { controllers.twoHundred(contactById) }
})

router.post('/', async (req, res, next) => {
  const { name, email, phone } = req.body
  if (name === undefined || email === undefined || phone === undefined) {
    res.status(400).json(controllers.fourHundred('Missing required field'))
    return
  }
  const newContact = await contactFuncs.addContact({ email, name, phone })
  if (newContact.valid === null) {
    res.status(400).json(controllers.fourHundred('Unvalid field'))
  } else {
    res.status(201).json(controllers.twoZeroOne(newContact))
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contactFuncs.removeContact(contactId)

  if (deletedContact === null) {
    res.status(404).json(controllers.fourZeroFour())
  } else { res.json(controllers.twoHundred(deletedContact)) }
})

router.put('/:contactId', async (req, res, next) => {
  const { contactId } = req.params
  if (Object.keys(req.body).length === 0) {
    res.status(400).json(controllers.fourHundred('Missing fields'))
    return
  }

  const updatedContact = await contactFuncs.updateContact(contactId, req.body)

  if (updatedContact === null) {
    res.status(404).json(controllers.fourZeroFour())
  } else if (updatedContact.valid === null) {
    res.status(400).json(controllers.fourHundred('Unvalid field'))
  } else { res.json(controllers.twoHundred(updatedContact)) }
})

module.exports = router
