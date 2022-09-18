const express = require('express');
const Joi = require('joi');

const { listContacts, getContactById, addContact, removeContact, updateContact} = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = JSON.parse(await listContacts());
  return res.status(200).json({ contacts, message: 'Success' });
})

router.get('/:contactId', async (req, res, next) => {  
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    return res.status(404).json({ message: 'Not found' });
  }

  return res.status(200).json({ contact, message: 'Success' });
})

router.post('/', async (req, res, next) => {

  const { name, email, phone } = req.body;
  
  if (!name) {
    return res.status(400).json({ message: `Missing required name field` });
  }
  
  if (!email) {
    return res.status(400).json({ message: `Missing required email field` });
  }

  if (!phone) {
    return res.status(400).json({ message: `Missing required phone field` });
  }

  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^\w+\s/)
      .min(3)
      .max(30)
      .required(),
    email:Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
      .required(),
    phone: Joi.string()
      .pattern(/^(?:\+38)?(?:\(\d{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})/)
      .required(),
  });

  const validation = schema.validate(req.body); 
  if (validation.error) {
    return res.status(400).json({ message: `Failed because ${validation.error}` });
  }

  const contact = await addContact(req.body);
  return res.status(201).json({ contact, message: 'Success' });
})

router.delete('/:contactId', async (req, res, next) => {
  
  const contacts = await removeContact(req.params.contactId);
  const idArr = contacts.map(contact => contact.id);

  if (idArr.includes(req.params.contactId)) {
    return res.status(200).json({ message: 'Contact deleted' });
  } 

  return res.status(404).json({ message: 'Not found' });
})

router.put('/:contactId', async (req, res, next) => {

  const keysOfBody = Object.keys(req.body);

  if (keysOfBody.length === 0) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^\w+\s/)
      .min(3)
      .max(30)
      .optional(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
      .optional(),
    phone: Joi.string()
      .pattern(/^(?:\+38)?(?:\(\d{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})/)
      .optional(),
  });

  const validation = schema.validate(req.body);
  
  if (validation.error) {
    return res.status(400).json({ message: `Failed because ${validation.error}` });
  }

  const contacts = await updateContact(req.params.contactId, req.body);

  const contact = contacts.filter(contact => contact.id === req.params.contactId )
  if (contact.length === 1) {
    return res.status(200).json({ contact, message: 'Success' });
  }
  
  return res.status(404).json({ message: 'Not found' })
  
  
})

module.exports = router;
