const express = require('express')
const {
  getContactById,
  addContact,
  updateContact,
  getAll,
  deleteContact,
} = require('../../models/contacts/index')
const {HttpError} =require('../../helpers')
const Joi = require('joi')

const router = express.Router()
const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get('/', async (req, res, next) => {
  try {
     const result = await getAll()
     res.json(result)
  } catch (error) {
   next(error)
  }
})


router.get('/:id', async (req, res, next) => {
 try {
   const {id} = req.params
   const result = await getContactById(id)
   
  if (!result) {
   throw HttpError(404, `Contacts ${id} not found`)
  }
   res.json(result)
   
 } catch (error) {
    next(error)
 }
})

router.post('/', async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
    const result = await addContact(req.body)
    res.status(201).json(result)
     
  } catch (error) {
    next(error )
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
     const { error } = addContactSchema.validate(req.body)
    if (error) {
      throw HttpError(400, error.message)
    }
     const contactId = req.params.contactId
  const result = await deleteContact(contactId)
  res.json(result)
  } catch (er) {
    res.status(500). json({
       message:'Not found '
     })
  }
})

router.put('/:id', async (req, res, next) => {
 try {
        const {error} = addContactSchema.validate(req.body);
        if(error) {
            throw HttpError(400, error.message)
        }
        const { id } = req.params;
        const result = await updateContact(id, req.body);
        if (!result) {
            throw HttpError(404, `Contacts with ${id} not found`);
        }
        res.json(result);
    }
    catch(error) {
        next(error);
    }
})

module.exports = router



