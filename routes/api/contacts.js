const express = require('express')
const { 
  listContacts,
  getContactById, 
  addContact,
  removeContact,
  updateContact,
  } = require('../../models/contacts')

const router = express.Router()

router.get('/', async (req, res, next) => {
  res.json({ message: 'template mess' })
})

router.get('/api/contacts', async (req, res, next) => {
  const data = await listContacts() 
  res.json( {contacts: data} ) 
})

router.get('/api/contacts/:contactId', async (req, res, next) => {
  const data = await getContactById(req.params.contactId) 
  console.log( await getContactById(req.params.contactId) ) 
  res.json( {contacts: data} )
})

router.post('/api/contacts', async (req, res, next) => {
  const body = req.query
  res.status(201)
  res.json({
    name: body.name,
    email: body.email,
    phone: body.phone,
  })
  addContact( 
    body.name,
    body.email,
    body.phone,)
})

 router.delete('/api/contacts/:contactId', async (req, res, next) => {
  const data = req.params.contactId
  res.status(201).json({
    message: "removed succesfully",
    id: data})
  removeContact(data) 
 })

router.put('/api/contacts/:contactId', async (req, res, next) => {
  const data = req.params.contactId
  const body = req.query
  res.status(201).json({
    message: "updated succesfully",
    id: data})
  updateContact(data, body) 
})

module.exports = router
