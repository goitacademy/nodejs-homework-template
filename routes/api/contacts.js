const express = require('express');
// n
const router = express.Router();
const {
  listContacts,
  getContactById,
  // addContact,
  // updateContact,
  // removeContact,
} = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  res.status(200).json(await listContacts());
})

router.get('/:contactId', async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(400).json({ message: "Not found" });
  }
  
});

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
