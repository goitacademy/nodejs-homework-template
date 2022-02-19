const express = require('express')
const contactsModel = require('../../models/contacts')

const {contactsSchema} = require('./contacts-validation-schem')
const {validate} = require('../../middlewares/validation')

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactsModel.listContacts()
  res.json({ status: 'success', code: 200, payload: {contacts} })
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactsModel.getContactById(req.params.contactId)
  if (contact) {
    return res.json({ status: 'success', code: 200, payload: {contact} })
  }
  return res
  .status(404)
  .json({ status: 'error', code: 404, message:'Not found' })
})

router.post('/', validate(contactsSchema), async (req, res, next) => {
  const contact = await contactsModel.addContact(req.body)
  res.status(201).json({ status: 'success', code: 201, payload: {contact} })
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contactsModel.removeContact(req.params.contactId)
  if (contact) {
    return res.json({ status: 'success', code: 200, message: 'Contact deleted' })
  }
  return res
  .status(404)
  .json({ status: 'error', code: 404, message:'Not found' })
})

router.put('/:contactId', validate(contactsSchema), async (req, res, next) => {
  const contact = await contactsModel.updateContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'success', code: 200, payload: {contact} })
  }
  return res
  .status(404)
  .json({ status: 'error', code: 404, message:'Not found' })
})

module.exports = router
