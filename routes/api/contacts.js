const express = require('express')
const Joi = require('joi')

const contacts = require('../../models/contacts')

const router = express.Router();
const {HttpError} = require('../../helpers')


const contactAddSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})
router.get('/', async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
  res.json(result)
  } catch (error) {

    next()
  }
 
})

router.get('/:id', async (req, res, next) => {

  try {
    const { id } = req.params;
    const result = await contacts.getContactById(id);
    if (!result) {
    throw HttpError(404, `Contact with ${id} not found`)
    }
    res.json(result)
  } catch (error) {
    next(error)

  }
 
})

router.post('/', async (req, res, next) => {
try {
  const {error} = contactAddSchema.validate(req.body)
  if(error){
    throw HttpError(400, "missing required name field")
  }
  const result = await contacts.addContact(req.body)
  res.status(201).json(result)
} catch (error) {
  next(error)
}
})

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = contactAddSchema.validate(req.body)
    if(error){
      throw HttpError(400, "missing fields")
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body)
    if (!result) {
      throw HttpError(404, `Contact with ${id} not found`)
      }
    res.json(result)
  } catch (error) {
    next(error)
  }
  })


router.delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
  const result = await contacts.removeContact(id)
  if (!result) {
    throw HttpError(404, `Contact with ${id} not found`)
    }
    res.json({
      message: "contact deleted"
    })
    } catch (error) {
      next(error)
    }
})



module.exports = router
