const express = require('express')
// express для маршрутизації
const router = express.Router();
// створюємо сторінку записної книжки
const contacts = require("../../models/contacts.json");

router.get('/', async (req, res, next) => {
  res.json(contacts)
})
 
router.get('/:contactId', async (req, res, next) => {
  res.json(contacts[1])
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

module.exports = router;
