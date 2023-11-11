const express = require('express');

const router = express.Router();

const queries = require("../../models/contacts");
const schema = require("./joi");
const errors = require("./errors"); 

router.get('/', async (_, res, __) => {
  try {
    const result = await queries.listContacts();
    res.json(result);
  } catch (e) {
    res.status(500).json({
      message: e.message,
    });
  }
});

router.get('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await queries.getContactById(contactId);
    if (!result) {
      throw new errors(404);
    }
    res.json(result);
  } catch (e) {
    next(e);
  }
});


router.post('/', async (req, res, _) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = schema.validate({ name, email, phone });

    if (error) {
      res.status(400).json({ message: 'missing required field' });
      return;
    }

    const newContact = await queries.addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await queries.removeContact(contactId);
    if (!result) {
      res.status(404).json({ message: 'Not found' });
      return;
    }
    res.json({ message: `Contact with ID ${contactId} deleted` });
  } catch (e) {
    next(e);
  }
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const { error } = schema.validate({ name, email, phone });

    if (error) {
      return res.status(400).json({ message: 'missing fields' });
    }

    const { contactId } = req.params;
    const result = await queries.getContactById(contactId);
    if (!result) {
      return res.status(404).json({ message: 'Not found' });
    }

    const updatedContact = await queries.updateContact({
      contactId,
      body: req.body,
    });
    res.status(200).json(updatedContact);
  } catch (e) {
    next(e);
  }
});


module.exports = router