const express = require('express')
const Joi = require('joi')
const router = express.Router()

const {listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact} = require('../../models/contacts')

const HttpError = require('../../helpers')

const addSchema = Joi.object().keys({
  name: Joi.string().required,
  email:Joi.string().required,
  phone:Joi.string().required,
})

router.get('/', async (req, res, next) => {
  const result = await listContacts();
  res.status(200).json(result)
})

router.get('/:contactId', async (req, res, next) => {
  try {
    const result = await getContactById(req.params.contactId)
  if(!result){
   throw HttpError(404, 'Not found')
  }
 res.status(200).json(result) 
  } catch (error) {
    next(error)
  }
})

router.post('/', async (req, res, next) => {
  try {
    console.log(req.body)
    const {error} = addSchema.validate(req.body)
    if(error){
      throw HttpError(400, error.message)
    }
    const result = await addContact(req.body);
    console.log(result)
  res.status(201).json(result)
  } catch (error) {
    next(error)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId)
  if(!result){
    throw HttpError(404, 'Not found')
   }
   res.status(200).json({ message: 'contact deleted' }) 
  } catch (error) {
    next(error)
  }
})

router.put('/:contactId', async (req, res, next) => {
  try {
    if(!req.body) {
      throw HttpError(400, "missing fields")
    }
    const {error} = addSchema.validate(req.body)
    if(error){
      throw HttpError(400, error.message)
    }
    const result = await updateContact(req.params.contactId, req.body)
    if(!result){
      throw HttpError(404, 'Not found')
     }
   res.status(200).json(result)
  } catch (error) {
    next(error)
  }
})

module.exports = router
