const express = require('express')

const router = express.Router()

const contacts = require ('../../models/contacts') 
const {HttpError} = require('../../helpers/HttpError')
const jsonParser = express.json()

const ContactController = require('../../controllers/contact')

// const Joi = require("joi")
// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().required(),
//   phone: Joi.string().required(),
// })


// Get all contacts
router.get('/', ContactController.getContacts

// async (req, res) => {
// try {
//   const result = await Contact.find().exec()
//   console.log(result)
//   res.json(result)
// }
// catch (error) {
//   res.status(500).json({ message: 'Server error' })
//   }
// }
)  

// Get by id
router.get('/:id', ContactController.getContactById
  // async (req, res, next) => {
  // try {
  //   const { id } = req.params
  //   const result = await contacts.getContactById(id) 
  //   console.log(result)
  //   if (!result) {
  //     throw HttpError(404, "Not found")
  //   }
  //   res.json(result)
  // }
  // catch (error) {
  //   next(error)
  // }
  // }
)

// Create contact
router.post('/', jsonParser, ContactController.createContact
  // async (req, res, next) => {
  // try {
  //   const { error } = addSchema.validate(req.body)
  //   if (error) {
  //     throw HttpError(400, error.message)
  //   }
  //   const result = await contacts.addContact(req.body)
  //   res.status(201).json(result)
  // }
  // catch (error) {
  //   next(error)
  // }
  
  // }
)

// Delete 
router.delete('/:contactId', jsonParser, ContactController.deleteContact
  // async (req, res, next) => {
  // try {
  //   const { contactId } = req.params
  //   const result = await contacts.removeContact(contactId)
  //   if (!result) {
  //     throw HttpError(404, "Not found")
  //   }
  //   res.json({ message: 'Contact deleted' })
  // }
  // catch (error) {
  //   next(error)
  // }
  // }
)

router.put('/:contactId', ContactController.updateContact
  // async (req, res, next) => {
  // try {
  //   const { error } = addSchema.validate(req.body)
  //   if (error) {
  //     throw HttpError(400, error.message)
  //   }
  //   const { contactId } = req.params
  //   const result = await contacts.updateContact(contactId, req.body)
    
  //   if (!result) {
  //     throw HttpError(404, "Not found")
  //   }
  //   res.json(result)
  // }
  // catch (error) {
  //   next(error)
  // }
  // }
)

router.patch('/:id', jsonParser, ContactController.patchFavorites)

module.exports = router