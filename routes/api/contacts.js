const express = require('express');
const contacts = require('../../models/contacts');

const { nanoid } = require('nanoid');

const Joi = require('joi');
const schema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(1)
    .required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
  phone: Joi.number()
    .required()
})


const router = express.Router()

router.get('/', async (req, res) => {
  const contactsList = await contacts.listContacts();
  res.json({
    status: 'success',
    code: 200,
    data: {
      contactsList,
    } 
  });
});


router.get('/:contactId', async (req, res) => {
  const  {contactId}  = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  };
  res.json({
    status: 'success',
    code: 200,
    data: {
      contact,
    }
  });
});

router.post('/', async (req, res, next) => {
  const {name, email, phone} = req.body;

const validationResult = schema.validate(req.body);
if (validationResult.error) {
  return res.status(400).json({status: validationResult.error})
}

  const newContact = {
      id: nanoid(),
      name, 
      email,
      phone,
  };
  contacts.addContact(newContact);
  res.json({
    status: 'success',
    code: 201,
    data: {
      newContact,
    }
  });
});

router.delete('/:contactId', async (req, res, next) => {
  const  {contactId}  = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  if (!deletedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({
    status: 'success',
    code: 200,
    message: "contact deleted"
  })
})

router.put('/:contactId', async (req, res, next) => {
  const {name, email, phone} = req.body;
  const  {contactId} = req.params;
  const contact = {
    name,
    email,
    phone
  };
  const updatedContact = await contacts.updateContact(contactId, contact);
  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.json({ 
    status: 'success',
    code: 200,
    data: {
      updatedContact,
    }
   })
})

module.exports = router
