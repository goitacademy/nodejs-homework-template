const express = require('express')

const router = express.Router();

const contacts = require("../../models/index") 

const {HTTPError} = require("../../helpers")

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts();
  res.json(result);
})

router.get('/:contactId', async (req, res, next) => {
  const result = await contacts.getContactById();
  res.json(result);
})

router.post('/', async (req, res, next) => {
  const result = await contacts.addContact();
  res.json(result);
})

router.delete('/:contactId', async (req, res, next) => {
  const result = await contacts.removeContact();
  res.json(result);
})

router.put('/:contactId', async (req, res, next) => {
  const result = await contacts.removeContact();
  res.json(result);
})

module.exports = router
