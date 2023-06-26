const express = require('express')
const contacts=require('../../models/contacts')

const router = express.Router()
const joi=require('joi');

const contactsSchema=joi.object({
  name:joi.string().required(),
  email:joi.string().required(),
  phone:joi.number().required()
})

router.get('', async (req, res, next) => {
  try {
    const result=await contacts.listContacts();
     res.json(result)
  } catch (error) {
    res.status(500).json ({message:error.message})
  }
})

router.get('/:contactId', async (req, res, next) => {
try {
  const {contactId}=req.params
   const result=await contacts.getContactById(contactId)
  if(!result){
    res.status(404).json ({message:'not found'})
  }
  res.json(result)
} catch (error) {
  res.status(500).json ({message:error.message})
}
next ()
})

router.post('/', async (req, res, next) => {
try {
  const {error}=contactsSchema.validate(req.body)  
  if(error){
    res.status(400).json ({message:'missing required name field'})}
  const result= await contacts.addContact(req.body)
  return res.status(201).json(result)
} catch (error) {
 next(error)
}
})

router.delete('/:contactId', async (req, res, next) => {
  try {
    const {contactId}=req.params
    const result= await contacts.removeContact(contactId)
    if(!result){
      res.status(404).json ({message:'not found'})
        }
res.json({message:'contact deleted' })
  } catch (error) {
    next (error)
  }
})

router.put('/:contactId', async (req, res, next) => {
try {
  const {error}=contactsSchema.validate(req.body)  
  if(error){
    res.status(400).json ({message:'missing fields'})
  }
  const {contactId}=req.params
  const result= await contacts.updateContact(contactId, req.body)
  if(!result){
    res.status(404).json ({message:'not found'})
      }
  res.json(result)
} catch (error) {
  next(error)
}
})

module.exports = router
