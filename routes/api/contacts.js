const express = require('express')
const router = express.Router()
const Joi = require('joi')
const contactsFunctions = require('../../models/contacts.js')
const createError = require('../../helpers')

const joiSchema = Joi.object({
  name: Joi.string()
    .min(3)
    .max(30).required(),
  email: Joi.string().email({
    minDomainSegments: 2,
  }).required(),
  phone: Joi.required()
})

router.get('/', async (req, res, next) => {
  try {
    res.json(await contactsFunctions.listContacts())
  } catch (error) {
    next(error)
  }
})

router.get('/:contactId', async (req, res, next) => {
   try {
     const {
       contactId
     } = req.params;
     const contact = await contactsFunctions.getContactById(contactId)

     if (!contact) {
       throw createError(404)
     }
     res.json(contact)
   } catch (error) {
    next(error)
   }

  }
)

router.post('/', async (req, res, next) => {
  try {
  const {error} = joiSchema.validate(req.body)
    if (error) {
      throw createError(400, error.message)
    }
    const addedContact = await contactsFunctions.addContact(req.body)

    res.status(201).json(addedContact)
} catch (error) {
  next(error)
}
})

router.delete('/:contactId', async (req, res, next) => {
  try {
     const {
       contactId
     } = req.params;

     const deletedContact = await contactsFunctions.removeContact(contactId)
    if (!deletedContact) {
       throw createError(404)
     }

     res.json({
       "message": "contact deleted"
     })
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body)
    if (error) {
      throw createError(400, error.message)
    }
    const {
      contactId
    } = req.params;

       const updateContact = await contactsFunctions.updateContact(contactId, req.body)
    if (!updateContact) {
      throw createError(404)
    }
    res.json(updateContact)
  } catch (error) {
    next(error)
  }
})

module.exports = router