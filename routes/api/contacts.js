const {RequestError}=require('../../helpers')
const express = require('express')

const router = express.Router()

const contacts=require("../../models/contacts")

router.get('/', async (req, res, next) => {
  try{
  const result= await contacts.listContacts()  
  res.json(result)
} catch(error) {
  next(error)
}})

router.get('/:contactId', async (req, res, next) => {
  try{
    const {contactId}=req.params;
    const result= await contacts.getContactById(contactId)
    if(!result){
      throw RequestError(404,'Not found')
  }
  res.json(result)}
  catch(error){
      next(error)
  }
})

router.post('/', async (req, res, next) => {
  const body=req.params
  const result= await contacts.addContact(body)
  res.json(result)
})

router.delete('/:contactId', async (req, res, next) => {
  const result=await contacts.removeContact
  res.json(result)
})

router.put('/:contactId', async (req, res, next) => {
  const result=await contacts.updateContact()
  res.json(result)
})

module.exports = router
