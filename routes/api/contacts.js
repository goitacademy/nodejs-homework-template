const express = require('express')
const contactsModel = require('../../models/contacts')
const {schemaCreateContact} = require('../validation')
const {validation} = require('../../middlewares/validation')
const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactsModel.listContacts()
  res.json({ status: 'success', code: 200, payload: {contacts} })
})

router.get('/:contactId', async (req, res, next) => {
   const contacts = await contactsModel.getContactById(req.params.contactId)
   if (contacts) {
     return res.json({ status: 'success', code: 200, payload: {contacts} })
   }
   return res.status(404).json({status: 'eror', code: 404, massage: 'Not Faund'})
})

router.post('/', validation(schemaCreateContact), async (req, res, next) => {
  const contacts = await contactsModel.addContact(req.body)
  res.status(201).json({ status: 'success', code: 201, payload: {contacts} })
})

router.delete('/:contactId', async (req, res, next) => {
  const contacts = await contactsModel.removeContact(req.params.contactId)
   if (contacts) {
     return res.json({ status: 'success', code: 200, payload: {contacts} })
   }
   return res.status(404).json({status: 'eror', code: 404, massage: 'Not Faund'})
})

router.put('/:contactId', validation(schemaCreateContact), async (req, res, next) => {
   const contacts = await contactsModel.updateContact(req.params.contactId, req.body)
   if (contacts) {
     return res.json({ status: 'success', code: 200, payload: {contacts} })
   }
   return res.status(404).json({status: 'eror', code: 404, massage: 'Not Faund'})
})

module.exports = router
