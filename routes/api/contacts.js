const Joi = require('joi');
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
    const schema = Joi.object({
      name: Joi.string()
          .alphanum()
          .min(3)
          .max(30)
          .required(),
      email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pl'] } })
      .required(),
      phone: Joi.string()
      .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
      .required(),
    })
    try{
      const body = await schema.validateAsync({
        name: req.query.name,
        email: req.query.email,
        phone: req.query.phone,
      }) 
      addContact( body )
      res.status(201).json(body)
    }catch(err){
      res.status(400).json({
        message: err
      })
    }
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
  const schema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'pl'] } })
    .required(),
    phone: Joi.string()
    .pattern(/^\(\d{3}\) \d{3}-\d{4}$/)
    .required(),
  })
  try{
    const body = await schema.validateAsync({
      name: req.query.name,
      email: req.query.email,
      phone: req.query.phone,
    }) 
    updateContact(data, body)
    res.status(201).json(body).json({id: data})
  }catch(err){
    res.status(400).json({
      message: err
    })
  }
})

module.exports = router
