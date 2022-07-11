const { listContacts, getContactById, removeContact, addContact } = require('../../models/contacts');
const express = require('express')
const Joi = require("joi");

const router = express.Router()


const propTypes = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

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
  console.log(req.body)
  const { error } = propTypes.validate(req.body);
  if (error) {
    throw new Error(error.message, 400);
  }
  addContact(req.body).then(contact => res.status(201).send(contact))
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
