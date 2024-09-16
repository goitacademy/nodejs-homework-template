const express = require('express');
const router = express.Router();
const { listContacts, getContactById, addContact, removeContact, updateContact } = require("../../models/contacts");
const scheme = require("../../models/auth");
const joi = require("joi");

router.get('/', async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({message: "Not found"})
  }
});

router.post('/', async (req, res, next) => {
  const newContact = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const validatedBody = scheme.validate(newContact);
  if (validatedBody.error) {
    const errorMessage = `missing required ${validatedBody.error.details[0].context.key} - field`;
    return res.status(400).json({ message: errorMessage });
  }
  try {
    const addedContact = await addContact(newContact);
    return res.status(201).json(addedContact);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await removeContact(id);
  if (contact) {
    res.status(200).json({message: "contact deleted"});
  } else {
    res.status(404).json({message: "Not found"});
  }
});

router.put('/:contactId', async (req, res, next) => {
  if (!req.body) {
		res.status(400).json({ message: 'missing fields' })
	};
	const newContact = {
		name: req.body.name,
		email: req.body.email,
		phone: req.body.phone,
	};
	const validatedBody = scheme.validate(newContact);
  if (validatedBody.error) {
    return res.status(404).json({ message: "Not found" });
  }
  try {
    const updatedContact = await updateContact(req.params.contactId, newContact);
    return res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router
