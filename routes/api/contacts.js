const Joi = require('joi');
const express = require('express');

const { listContacts, getContactById, addContact, removeContact, updateContact } = require('../../models/contacts');

const router = express.Router()

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get('/', async (req, res, next) => {
  try {
    const contactsList = await listContacts();
    res.status(200).json(contactsList);
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const contact = await getContactById(req.id);
    res.status(200).json(contact);
  } catch {
    next(error);
    res.status(404).json({ message: "Not found" });
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "Missing required name field" });
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});


router.delete('/:contactId', async (req, res, next) => {
  try {
    const deletedContact = await removeContact(req);
    if (deletedContact === null) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { id, body } = req;

    const { error } = contactSchema.validate(body);

    if (error) {
      return res.status(400).json({ message: "Missing fields" });
    }

    const updatedContact = await updateContact(id, body);
    if (!updatedContact) {
      return res.status(404).json({ message: "Not found" });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
