const express = require('express')
const contactsModel = require('../../models/contacts')
const {schemaCreateContact, schemaMongoId} = require('../validation')
const {validation, validationParams} = require('../../middlewares/validation')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactsModel.listContacts()
  res.json({ status: 'success', code: 200, payload: {contacts} })
})

router.get('/:contactId', validationParams(schemaMongoId), async (req, res, next) => {
   const contacts = await contactsModel.getContactById(req.params.contactId)
   if (contacts) {
     return res.json({ status: 'success', code: 200, payload: {contacts} })
   }
   return res.status(404).json({status: 'error', code: 404, message: 'Not Faund'})
})

router.post('/', validation(schemaCreateContact), async (req, res, next) => {
  const contacts = await contactsModel.addContact(req.body)
  res.status(201).json({ status: 'success', code: 201, payload: {contacts} })
})

router.delete('/:contactId', validationParams(schemaMongoId), async (req, res, next) => {
  try {
    const contacts = await contactsModel.removeContact(req.params.contactId)
  if (contacts) {
     return res.json({ status: 'success', code: 200, message: 'contact deleted', payload: {contacts} })
   }
   return res.status(404).json({status: 'error', code: 404, message: 'Not found'})
  } catch(err) {
    next(err)
  }
  },)

router.put('/:contactId', validationParams(schemaMongoId), validation(schemaCreateContact), async (req, res, next) => {
   const contacts = await contactsModel.updateContact(req.params.contactId, req.body)
   if (contacts) {
     return res.json({ status: 'success', code: 200, payload: {contacts} })
   }
   return res.status(404).json({status: 'error', code: 404, message: 'Not found'})
})

module.exports = router
