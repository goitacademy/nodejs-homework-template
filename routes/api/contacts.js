const { json } = require('express')
const express = require('express')
const { reset } = require('nodemon')
const router = express.Router()
const Contacts = require('../../model/contacts')
const {
  validationCreateContact,
  validationUpdateContact,
  validationObjectId } = require('../../valid-contact-router');
const { handleError, } = require('../../helper/handle-error')



//, получить список контактов - метод GET:
router.get('/', async (_req, res, next) => {
  try {
    const contacts = await Contacts.listContacts()
    console.log(contacts.id);// toObject
    return res.status(200).json({
      status: 'success', code: 200,
      data: {
        contacts, // toJSON
      }
    })
  } catch (e) {
    next(e)
  }
})


//, найти контакт по ID  - метод GET:
router.get('/:contactId', validationObjectId,  async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId)
    return res.json({ status: 'success', code: 200, data: { contact, } })
  } catch (e) {
    next(e)
  }
})

 
//, добаить контакт  - метод POST:
router.post('/',
  validationCreateContact,
  handleError(async (req, res, next) => {
      const contact = await Contacts.addContact(req.body)
        return res.status(201).json({ status: 'success', code: 201, data: { contact, } })
    }))


// , - обновить  заменить весь объект  - метод PUT:
router.put("/:contactId", validationUpdateContact, validationObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.updateContact(req.params.contactId, req.body)
    return res.status(200).json({ status: 'success', code: 200, data: { contact, } })
  } catch (e) {
    next(e)
  }
})


//, - удалить контакт по ID -  метод DELETE:
router.delete('/:contactId', validationObjectId, async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId)
    return res.json({
      status: 'success', code: 200, data: { "message": "contact deleted", contact, }
    })
  } catch (e) {
    next(e)
  }
})


//, - заменить статус (изменить что-то в существующем объекте) по ID  - метод PATCH:
router.patch("/:contactId",
  validationUpdateContact,
  validationObjectId,
  async (req, res, next) => {
  try {
      const contact = await Contacts.updateContact(req.params.contactId, req.body)
        return res.status(200).json({ status: 'success', code: 200, data: { contact, } })
  } catch (e) {
    return res.status(404).json({ status: 'error', code: 404, data: 'Not Found' })
  }
})



module.exports = router
