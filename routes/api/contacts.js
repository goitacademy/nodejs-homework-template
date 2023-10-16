import express from 'express'
import contactService from '../../models/contacts.js'
import HttpError from '../../helpers/HttpError.js'
import Joi from 'joi'
import Contact from '../../models/Contact.js'
import { contactAddSchema } from "../../models/validator.js";
import authenticate from './middleWare/authenticate.js';


const contactAddSchema = Joi.object({
 name: Joi.string()
        .alphanum().messages({"string.alphanum": "name must only contain alpha-numeric characters"})
        .min(3)
        .max(30)
        .required().messages({
    "any.required": `missing required name field`
  }),
  email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).messages({'string.email': 'email must be a valid email'})
        .required().messages({
    "any.required": `missing required email field`
  }),
  
  phone: Joi.number().messages({ "number.base": `phone must be a number` })
  .integer()  
  .min(0)
  .max(1000000000000000).messages({ "number.unsafe": 'phone must be a correct number' })
  .required().messages({
    "any.required": `missing required phone field`
  })
})

const router = express.Router()

router.use(authenticate)

router.get('/', async (req, res, next) => {
  const {_id: owner} = req.user
  const {page = 1, limit = 10} = req.query
  const skip = (page - 1) * limit
  const result = await Contact.find({owner}, "-createdAt -updatedAt", {skip, limit}).populate("owner", "email")
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
        console.log(validateContact.error)
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
      message: `not found`
    })
  }
  res.json({
    message: "contact deleted"
  })
} catch (error) {
  next(error)
}
})

router.put('/:contactId', async (req, res, next) => {
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
      }}
  const {_id: owner } = req.user;
  if (Object.keys(req.body).length !== 0) {
    try {
    const validateContact = contactAddSchema.validate(req.body)
    if(!validateContact.error) {
       const result = await Contact.create({...req.body, owner})
      res.status(200).json(result)
    } else {
         res.status(400).json({
          message: validateContact.error.message
         })
    }
} catch (error) {
  next(error)
}
}})

export default router
