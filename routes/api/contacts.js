import express from 'express'
import Joi from 'joi'
import contactsService from "../../models/contacts.js"
import {HttpError} from "../../helpers/index.js"
const router = express.Router()

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages(
    {"message": "missing required name field"}),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

const contactPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).min(1);

router.get('/', async (req, res, next) => {
  try {
    const result = await contactsService.listContacts()
    res.json(result)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const {id} = req.params
    const result = await contactsService.getContactById(id)
    if(!result){
      throw HttpError(404, `Contact by this ${id} id is not found`)
    }
    res.json(result);
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body)
    if(error){
      throw HttpError(400, error.message)
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId} = req.params;
    const result = await contactsService.removeContact(contactId);
    if(!result){
      throw new HttpError(404, `Contact by this ${contactId} id is not found`)
    }
    res.status(200).json({
      "message": "contact deleted"
    }) 
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    const {error} = contactPutSchema.validate(req.body)
    if(error){
      throw HttpError(400, error.message)
    }
    const {contactId} = req.params
    const result = await contactsService.updateContactsById(contactId, req.body)
    if(!result){
      throw HttpError(404, `Contact by this ${id} id is not found`)
    }
    res.status(200).json(result);
  } catch (error) {
    next(error)
  }
})
export default router;
