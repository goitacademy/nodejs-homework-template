const express = require('express');
const router = express.Router();
const Joi = require('joi');
const listContacts = require('../../controllers/listContacts');
const getContactById = require('../../controllers/getContactById');
const addContact = require('../../controllers/addContacts');
const removeContact = require('../../controllers/removeContacts');
const updateContact = require('../../controllers/updateContact');

const addContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

router.get('/', (req, res) => {
  listContacts(req, res);
});

router.get('/:id', (req, res) => {
  getContactById(req, res);
});

router.post('/', (req, res) => {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  addContact(req, res);
});

router.delete('/:id', (req, res) => {
  removeContact(req, res);
});

router.put('/:id', (req, res) => {
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  updateContact(req, res);
});

module.exports = router;
