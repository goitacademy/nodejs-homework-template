const express = require('express');
const contactsApi = require('../../models/contacts.js');
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  phone: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'ua'] } }).required()
})

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = await contactsApi.listContacts();  
  res.status(200).json(contacts);
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await contactsApi.getContactById(id);
  if (!contact) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(200).json(contact);
})

router.post('/', async (req, res, next) => {  
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json( {message: error.details[0].message} );
  }
  
  const { name, phone, email } = req.body;
  const dataWithId = { id: uuidv4(), name, email, phone  }
  const contact = await contactsApi.addContact(dataWithId);
  res.status(201).json(contact);
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;  
  const idDeleted = await contactsApi.removeContact(id);
  if (!idDeleted) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(204).json( {message: `User with id${idDeleted} was deleted` });
})

router.put('/:contactId', async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json( {message: error.details[0].message} );
  }
  const id = req.params.contactId;
  const data = req.body;
  
  const contact = await contactsApi.updateContact(id, data);
  if (!contact) {
    return res.status(404).json({message: "Not found"});
  }
  res.status(200).json( contact )
})

module.exports = router;
