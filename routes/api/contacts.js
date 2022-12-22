const express = require('express')

const router = express.Router()

const contacts = require('../../models/contacts');

router.get('/', async (req, res, next) => {
  const result = await contacts.listContacts();
  res.status(200).json(result)
})

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const result = await contacts.getContactById(id);
  if (result === null) {
    return res.status(404).json({ message: "Not found" })
  }
  res.json(result)
})

router.post('/', async (req, res, next) => {

  const { name, email, phone } = req.body;

  const result = await contacts.addContact({ name, email, phone })
  res.status(201).json(result)
})

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const result = await contacts.removeContact(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" })

})

router.put('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;

  const { name, email, phone } = req.body;
  const result = await contacts.updateContact(id, { name, email, phone });
  res.status(200).json(result);
})

module.exports = router