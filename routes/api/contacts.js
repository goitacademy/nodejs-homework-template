const express = require('express')
const contactsModel = require('../../models/contacts')
const { schemaCreateContact } = require('./contacts-validation-schemes')
const { validateBody } = require('../../middlewares/validation')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactsModel.listContacts()
  res.json({ status: 'success', code: 200, data: { contacts } })
})

router.get('/:contactId', async (req, res, next) => {
  const contact = await contactsModel.getContactById(req.params.contactId)
  if (contact) {
    return res.json({ status: 'success', code: 200, data: { contact } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' })
})

router.post('/',validateBody(schemaCreateContact), async (req, res, next) => {
  const contact = await contactsModel.addContact(req.body)
  if (contact) {
    res.status(201).json({ status: 'success', code: 201, data: { contact } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: "Missing required name field" })
})

router.delete('/:contactId', async (req, res, next) => {
  const contact = await contactsModel.removeContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'success', code: 200, data: { contact }, message: "contact deleted" })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' })
})

router.put('/:contactId',validateBody(schemaCreateContact), async (req, res, next) => {
  const contact = await contactsModel.updateContact(req.params.contactId, req.body)
  if (contact) {
    return res.json({ status: 'success', code: 200, data: { contact } })
  }
  return res
    .status(404)
    .json({ status: 'error', code: 404, message: 'Not Found' })
})


module.exports = router
