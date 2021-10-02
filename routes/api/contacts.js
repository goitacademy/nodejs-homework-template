const express = require('express')
const router = express.Router()
const Contacts = require('../../model')

const {validateContact, validateContactPhone, validateContactId} = require('./validation')

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    res.json({status: 'success', code: 200, data: {contacts} })
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', validateContactId, async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if(contact){
      return res.status(200).json({status: 'success', code: 200, data: {contact} })
    }
    return res.status(400).json({status: 'error', code: 404, "message": "Not found" })
  } catch (error) {
    next(error)
  }
})

router.post('/', validateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body)
    res.status(201).json({status: 'success', code: 201, data: {contact} })
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', validateContactId, async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    if(contact){
      return res.status(200).json({status: 'success', code: 200, data: {contact} })
    }
    return res.status(400).json({status: 'error', code: 404, "message": "Not found" })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', validateContactId, validateContact,  async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if(contact){
      return res.status(200).json({status: 'success', code: 200, data: {contact} })
    }
    return res.status(400).json({status: 'error', code: 404, "message": "Not found" })
  } catch (error) {
    next(error)
  }
})

router.patch('/:contactId/phone', validateContactId, validateContactPhone, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    if(contact){
      return res.status(200).json({status: 'success', code: 200, data: {contact} })
    }
    return res.status(400).json({status: 'error', code: 404, "message": "Not found" })
  } catch (error) {
    next(error)
  }
})

module.exports = router
