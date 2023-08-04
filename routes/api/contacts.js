const express = require('express')
const { listContacts, getContactById, addContact, removeContact } = require('../../models/contacts');
const router = express.Router()

router.get('/', async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({ status: 'success', code: 200, data: contacts })
  } catch (error) {
    next(error);
  }
})

router.get("/:id", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.id);
    !contact.length ?
      res.json({ status: "failed", code: 404, message: "Contact not found" })
      : res.json({ status: 'success', code: 200, data: contact });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res, next) => {
  try {
    const { name, phone, email } = req.body;
    const contactId = Math.floor(Math.random() * 100);
    const newContact = await addContact(contactId, name, phone, email);
    res.json({ status: success, code: 201, data: { newContact } });
  } catch (error) {
    next(error);
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    const removedContact = await removeContact(req.params.id);
    removedContact.length ? res.json({ status: "success", code: 200, message: "Contact deleted" })
      : res.json({ status: "failed", code: 404, message: "Contact not found" })
  } catch (error) {
    next(error);
  }
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
