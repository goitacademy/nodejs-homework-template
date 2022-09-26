
const express = require('express')

const router = express.Router()

const contacts=require("../../models/contacts")

router.get('/', async (req, res, next) => {
  try{
  const result= await contacts.listContacts()  
  res.json(result)
} catch(error) {
  res.status(500).json({
    message:error.message
  })
}}  )

router.get('/:contactId', async (req, res, next) => {
  const result= await contacts.getContactById
  res.json( result)
})

router.post('/', async (req, res, next) => {
  const result= await contacts.addContact()
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
