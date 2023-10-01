import express from 'express'
import contactService from '../../models/contacts.js'
import HttpError from '../../helpers/HttpError.js'
import Joi from 'joi'

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `name required field`
  }),
  email: Joi.string().required().messages({
    "any.required": `email required field`
  }),
  phone: Joi.string().required().messages({
    "any.required": `phone required field`
  }),
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const result = await contactService.listContacts()
  res.json(result)
  } catch (error) {
    res.status(500).json({
      message: 'Server error'
    })
  }
  
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await contactService.getContactById(req.params.contactId)
    if(!result){
      throw HttpError(404, `contact with id: ${req.params.contactId} not found`)
    }
      res.json(result)
  } catch (error) {
    const {status = 500, message = "Server error"} = error;
      res.status(status).json({
        message,
      })
  }
})

router.post('/', async (req, res, next) => {
  try {
    const validateContact = contactAddSchema.validate(req.body)
    if(!validateContact.error) {
      const result = await contactService.addContact(req.body)
      res.status(201).json(result)
    } else {
         res.status(400).json({
          message: validateContact.error.message
         })
    }
} catch (error) {
  next(error)
}
})

router.delete('/:contactId', async (req, res, next) => {
try {
  const {contactId} = req.params
  const result = await contactService.removeContact(contactId)
  if (!result) {
    res.status(404).json({
      message: `Movie with this id not found`
    })
  }

  res.json({
    message: "Delete succes"
  })

} catch (error) {
  next(error)
}
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const validateContact = contactAddSchema.validate(req.body)
    if(!validateContact.error) {
      const id = req.params.contactId
      const result = await contactService.updateContactById(id, req.body)
      if(result === null) {
        res.status(404).json({
          message: 'Not Found'
        })
      }else {
        res.status(200).json(result)
      }
    } else {
         res.status(400).json({
          message: "missing fields"
         })
    }
} catch (error) {
  next(error)
}
})

export default router
