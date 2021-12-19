const express = require('express');
const router = express.Router();
const Contacts = require('../../model/index.js');
const { validateContact, validateId } = require('./validation.js');

router.get('/', async (req, res, next) => {
  try {
    console.log(req.method);
    const contacts = await Contacts.listContacts();
    res.json({ status: 'success', code: 200, data: { contacts } });
  } catch (error) {
    next(error);
  }
});

router.get('/:contactId', validateId, async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.id);
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});

router.post('/', validateContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    res.status(201).json({ status: 'success', code: 201, data: { contact } });
  } catch (error) {
    next(error);
  }
});

router.delete('/:contactId', validateId, async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.id);
    if (contact) {
      return res
        .status(200)
        .json({ status: 'success', code: 200, data: { contact } });
    }
    return res
      .status(404)
      .json({ status: 'error', code: 404, message: 'Not Found' });
  } catch (error) {
    next(error);
  }
});
router.put("/:contactId",validateContact, async (req, res, next) => {
  let body = req.body;
  let newContact;
  const { contactId } = req.params;
  if (!body) {
    res.status(400).json({ message: "missing fields" });
  }
  newContact = await updateContact(contactId, body);
  if (!newContact) {
    res.status(404).json({ message: "Not found" });
  }
  res.json({ newContact });
});

router.patch('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' });
});

module.exports = router;