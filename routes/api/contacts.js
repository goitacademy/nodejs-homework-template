const express = require('express');
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require('../../models/contacts');

const { schema } = require('../../validation');
const router = express.Router();

router.get('/', async (req, res, next) => {
  res.status(200).json(await listContacts());
});

router.get('/:contactId', async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post('/', async (req, res, next) => {
  const body = req.body;
  const { error } = await schema.validate(req.body);
  if (error) {
    res.status(400).json(error);
    return;
  }
  res.status(201).json(await addContact(body));
});

router.delete('/:contactId', async (req, res, next) => {
  const data = await removeContact(req.params.contactId);
  console.log(data);
  if (data) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put('/:contactId', async (req, res, next) => {
  const body = req.body;
  const { error } = await schema.validate(body);
  if (error) {
    return res.status(400).json(error);
  }
  const data = await updateContact(req.params.contactId, body);
  if (data) {
    return res.status(200).json(data);
  }
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
