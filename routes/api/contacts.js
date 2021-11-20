const express = require('express')
const router = express.Router()
const { controllerWrapper, validator } = require('../../middlewares')
const { contactsSchema } = require('../../schemas')
// const { contacts: ctrl } = require('../../contactsOperations/contacts/contacts')
const listContacts = require('../../contactsOperations/contacts/contacts')
const getContactById = require('../../contactsOperations/contacts/contacts')
const addContact = require('../../contactsOperations/contacts/contacts')
const removeContactById = require('../../contactsOperations/contacts/contacts')
const updateContactById = require('../../contactsOperations/contacts/contacts')

router.get('/', controllerWrapper(listContacts))
router.get('/:contactId', controllerWrapper(getContactById))

router.post('/', validator(contactsSchema), controllerWrapper(addContact))

router.delete('/:contactId', controllerWrapper(removeContactById))

router.put(
  '/:contactId',
  validator(contactsSchema),
  controllerWrapper(updateContactById)
)

// router.get('/', async (req, res, next) => {
//   try {
//     const contacts = await listContacts()
//     res.json({ status: 'success', code: 200, data: { contacts } })
//   } catch (error) {
//     next(error)
//   }
//   console.log(contacts)
// })

// router.get('/:contactId', async (req, res, next) => {
//   try {
//     const contact = await listContacts.getContactById(req.params.contactId)
//     if (contact) {
//       return res.status(200).json({ status: 'success', code: 200, data: { contact } })
//     }
//     return res.status(404).json({ status: 'error', code: 404, message: 'Not Found' })
//   } catch (error) {
//     next(error)
//   }
// })

// router.post('/', async (req, res, next) => {
//   try {
//     const contact = await listContacts.addContact(req.body)
//     res.status(201).json({ status: 'success', code: 201, data: { contact } })
//   } catch (error) {
//     next(error)
//   }
// })

// router.put('/:contactId', async (req, res, next) => {
//   try {
//     const contact = await listContacts.updateContact(req.params.contactId, req.body)
//     if (contact) {
//       return res.status(200).json({ status: 'success', code: 200, data: { contact } })
//     }
//     return res.status(404).json({ status: 'error', code: 404, message: 'Not Found' })
//   } catch (error) {
//     next(error)
//   }
// })

// router.delete('/:contactId', async (req, res, next) => {
//   try {
//     const contact = await listContacts.removeContact(req.params.contactId)
//     if (contact) {
//       return res.status(200).json({ status: 'success', code: 200, data: { contact } })
//     }
//     return res.status(404).json({ status: 'error', code: 404, message: 'Not Found' })
//   } catch (error) {
//     next(error)
//   }
// })

// router.patch('/:contactId', async (req, res, next) => {
//   try {
//     const contact = await listContacts.updateContact(req.params.contactId, req.body)
//     if (contact) {
//       return res.status(200).json({ status: 'success', code: 200, data: { contact } })
//     }
//     return res.status(404).json({ status: 'error', code: 404, message: 'Not Found' })
//   } catch (error) {
//     next(error)
//   }
// })

module.exports = router
