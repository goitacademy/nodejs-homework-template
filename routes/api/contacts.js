const express = require('express')
const contactsModels = require('../../models/contacts');

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    console.log(contactsModels.listContacts);
    const contacts = await contactsModels.listContacts;
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: 'Ошибка получения списка контактов' });
  }
});

router.get('/:contactId', async (req, res, next) => {
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
