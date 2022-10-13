const express = require('express')
const contactsFun = require('../../models/contacts')
const router = express.Router()
const Joi = require('joi')

const validateSchema = Joi.object({
  name: Joi.string()
  .alphanum()
  .min(3)
  .max(15)
  .required(),
  email: Joi.string()
  .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.string()
  .min(8)
  .max(12)
})


router.get('/', async (req, res, next) => {
  const result = await contactsFun.listContacts()
  res.status(200).json(result)
})
router.get('/:contactId', async ({params}, res, next) => {
  const result = await contactsFun.getContactById(params.contactId)
  if(result !== null){
    res.status(200).json(result)
  }
  res.status(404).json({ message: 'Not found' })
})

router.post('/', async (req, res, next) => {
  const isValid = validateSchema.validate(req.body)
  console.log(isValid.error);
  if(isValid.error){
    res.status(403).json({message: isValid.error.details[0].message})
  }
  if(!req.body.name || !req.body.phone || !req.body.email){
    res.status(400).json({message: "missing required name field"})
  }
  const result = await contactsFun.addContact(req)
  res.status(201).json(result)
})

router.delete('/:contactId', async ({params}, res, next) => {
  const result = await contactsFun.removeContact(params.contactId)
  if(result[0].id){
    res.status(200).json({ message: 'contact deleted' })
  }
  else{res.status(404).json({ message: 'Not found' })}
})

router.put('/:contactId', async (req, res, next) => {
  const isValid = validateSchema.validate(req.body)
  console.log(isValid.error);
  if(isValid.error){
    res.status(403).json({message: isValid.error.details[0].message})
  }
  const result = await contactsFun.updateContact(req.params.contactId, req.body)
  if(result !== null){
    res.status(200).json(result)
  }
  else{res.status(404).json({ message: 'Not found' })}
})

module.exports = router
