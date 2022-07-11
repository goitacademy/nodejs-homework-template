const { listContacts, getContactById, updateContact, removeContact, addContact } = require('../../models/contacts');
const express = require('express')
const Joi = require("joi");


const router = (
  express.Router()
);


const createSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required()
});


const updateSchema = createSchema.fork([
  'name',
  'email',
  'phone',
], key => key.optional());


router.get('/', (req, res, next) => {
  listContacts().then(contacts => {
    res.status(200);
    res.json({ contacts })
  });
})

router.get('/:contactId', (req, res, next) => {
  getContactById(req.params.contactId)
    .then(contact => {
      if (contact) {
        res.status(200);
        res.json(contact);
      } else {
        res.status(404);
        res.json({ message: 'Not found' });
      }
    });
})


router.post('/', async (req, res, next) => {
  const { error } = createSchema.validate(req.body);
  if (error) {
    res.status(400)
    res.json({ "message": `missing required ${error.message.split(" ")[0]} field` });
  } else {
    addContact(req.body).then(contact => res.status(201).send(contact))
  }
})

router.delete('/:contactId', async (req, res, next) => {
  removeContact(req.params.contactId)
    .then(targetContact => {
      if (!targetContact) {
        res.status(404);
        res.json({ message: 'Not found' });
      } else {
        res.status(200);
        res.json({ message: 'contact deleted' });
      }
    });
})

router.put('/:contactId', async (req, res, next) => {
  console.log(req.body);
  if (Object.keys(req.body).length < 1) {
    res.status(400);
    res.json({ message: 'missing fields' });
    return;
  }
  const { error } = updateSchema.validate(req.body);
  if (error) {
    res.status(400);
    res.json({ "message": `missing required ${error.message.split(" ")[0]} field` });
  } else {
    updateContact(req.params.contactId, req.body)
      .then(targetContact => {
        if (!targetContact) {
          res.status(404);
          res.json({ message: 'Not found' });
        } else {
          res.status(200);
          res.json(targetContact);
        }
      });
  }
})

module.exports = router
