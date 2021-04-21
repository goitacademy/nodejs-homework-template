const { json } = require('express')
const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()
const Contacts = require('../../model/contacts')
const {validationCreateContact, validationUpdateContact} = require('../../valid-contact-router');


//, получить список контактов - метод GET:
router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    return res.status(200).json({ status: 'success', code: 200, data: { contacts, } })
  } catch (e) {
    next(e)
  }
})


//, найти контакт по ID  - метод GET:
router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    if (contact) {
      return res.json({ status: 'success', code: 200, data: { contact, } })
    }
    else {
      return res.status(404).json({ status: 'error', code: 404, data: 'Not Found' })
    }
  } catch (e) {
    next(e)
  }
})


//, добаить контакт  - метод PUSH:
router.post('/', validationCreateContact, async (req, res, next) => {
  try {
    if (req.body.name && req.body.email && req.body.phone) {
 //, проверку делал по хронологии ДЗ (до валидации), работает без валидации , убирать пока не хочу

      const contact = await Contacts.addContact(req.body)
        return res.status(201).json({ status: 'success', code: 201, data: { contact, } })
    }
    else {
      return res.status(400).json({ status: 'error', code: 400, data: { "message": "missing required name field" } })
    }
 }  catch (e) {
    next(e)
  }
})


//, - обновить  заменить весь объект  - метод PUT:
router.put("/:contactId", validationUpdateContact, async (req, res, next) => {
  try {
    if ((req.body.name || req.body.email || req.body.phone)) {
 //, проверку делал по хронологии ДЗ (до валидации), работает без валидации , убирать пока не хочу
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res.status(200).json({ status: 'success', code: 200, data: { contact, } })
      }
    }
        return res.status(400).json({ status: 'error', code: 400, data: { "message": "missing fields" } })
  } catch (e) {
    next(e)
  }
})


//, - удалить контакт по ID -  метод DELETE:
router.delete('/:contactId', async (req, res, next) => {
  try {
    const contacts = await Contacts.removeContact(req.params.contactId)
    if (contacts) {
      return res.json({
        status: 'success', code: 200, data: { "message": "contact deleted" }
      })
    }
    else {
      return res.status(404).json({
        status: 'error', code: 404, data: { "message": "Not Found" }
      })
    }
  }catch (e) {
    next(e)
  }
})

//, - заменить статус (изменить что-то в существующем объекте) по ID  - метод PATCH
router.patch('/:contactId', validationUpdateContact, async (req, res, next) => {
    try {
    if ((req.body.name || req.body.email || req.body.phone)) {
 
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
      if (contact) {
        return res.status(200).json({ status: 'success', code: 200, data: { contact, } })
      }
    }
        return res.status(400).json({ status: 'error', code: 400, data: { "message": "missing fields" } })
  } catch (e) {
    next(e)
  }
})


module.exports = router
