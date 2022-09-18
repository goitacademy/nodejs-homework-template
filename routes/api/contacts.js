const express = require('express');
const Joi = require('joi');

const { listContacts, getContactById, addContact, removeContact, updateContact} = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res, next) => {
  const contacts = JSON.parse(await listContacts());
  res.json({ contacts, message: 'Success' });
})

router.get('/:contactId', async (req, res, next) => {  
  const contact = await getContactById(req.params.contactId);

  if (!contact) {
    res.json({ message: 'Not found' });
  }
  res.json({ contact, message: 'Success' });
})

router.post('/', async (req, res, next) => {

  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.json({ message: "Missing required name field" });
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
    return res.json({ message: `Failed because ${validation.error}` });
  }


  const contact = await addContact(req.body);
  res.json({ contact, message: 'Success' });
})

router.delete('/:contactId', async (req, res, next) => {
  
  const contacts = await removeContact(req.params.contactId);
  res.json({ contacts, message: 'Success' });
})

router.put('/:contactId', async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string()
      .pattern(/^\w+\s/)
      .min(3)
      .max(30)
      .optional(),
    email:Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'org'] } })
      .optional(),
    phone: Joi.string()
      .pattern(/^(?:\+38)?(?:\(\d{3}\)[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[ .-]?[0-9]{3}[ .-]?[0-9]{2}[ .-]?[0-9]{2}|044[0-9]{7})/)
      .optional(),
  });

  const validation = schema.validate(req.body); 
  if (validation.error) {
    return res.json({ message: `Failed because ${validation.error}` });
  }

  const contact = await updateContact(req.params.contactId, req.body);
  res.json({ contact, message: 'Success' })
})

module.exports = router;
