const express = require('express');
const router = express.Router();

const contacts = require("../../models/contacts.js");

router.get('/', async (req, res, next) => {
  res.json({ message: 'template message' })
});

router.get('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
