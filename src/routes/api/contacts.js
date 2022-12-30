const express = require('express')
const { getContactsController,
    getContactByIdController,
    removeContactController,
    addContactController,
    updateContactController,
    updateStatusContactController } = require('../../controllers/contactsControllers')

const router = express.Router()
const { addContactValidation, changeContactValidation, updateStatusValidation } = require('../middlewares/validation')
const { asyncWrapper } = require('../../helpers/apiHelpers')

router.get('/', asyncWrapper(getContactsController))
router.get('/:contactId', asyncWrapper(getContactByIdController))
router.post('/', addContactValidation, asyncWrapper(addContactController))
router.delete('/:contactId', asyncWrapper(removeContactController))
router.put('/:contactId', changeContactValidation, asyncWrapper(updateContactController))
router.patch('/:contactId/favorite', updateStatusValidation, asyncWrapper(updateStatusContactController))

module.exports = router

// router.get('/', async (_, res, next) => {
//   try {
//     // const contactList = await getContacts()
//     const contactList = await Contact.find({})
//     res.json({ contactList })
//   } catch (error) {
//     console.log(error)
//   }
// })

// router.get('/:contactId', async (req, res) => {
//   const {contactId} = req.params;
//   try {
//     const contact = await getContactById(contactId)
//     if (!contact) return res.sendStatus(404)
//     res.json({ contact })
//   } catch (error) {
//     console.log(error)
//   }
// })

// router.post('/', addContactValidation, async (req, res, next) => {
//   try {
//     const newContact = await addContact(req.body)
//     res.status(201).json({ newContact })
//   } catch (error) {
//     console.log(error)
//   }
// })

// router.delete('/:contactId', async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const data = await removeContact(contactId)
//     if (data === null) return res.sendStatus(404)
//     res.json({ "message": "contact deleted" })
//   } catch (error) {
//     console.log(error)
//   }
// })

// router.put('/:contactId', changeContactValidation, async (req, res, next) => {
//   const { contactId } = req.params;
//   try {
//     const updatedContact = await updateContact(contactId, req.body)
//     if (updatedContact === null) return res.sendStatus(404)
//     res.json({ updatedContact })
//   } catch (error) {
//     console.log(error)
//   }
// })
