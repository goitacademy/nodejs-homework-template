const express = require('express');
const contactsApi = require('../../models/contacts');
const router = express.Router();
const { putSchema, postSchema } = require('../../services/validation');

router.get('/', async (req, res, next) => {
  const contacts = await contactsApi.listContacts();
  res.status(200).json({ status: 'success', code: 200, data: contacts });
})
router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const contactById = await contactsApi.getContactById(contactId);
  if (!contactById) {
    res.status(404).json({ message: 'not found' });
  }
  res.status(200).json({ status: 'success', code: 200, data: contactById });
});

router.post('/', async (req, res, next) => {
  const { error } = postSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: `missing required name field - ${error}` });
  } else {
    const addedContact = await contactsApi.addContact(req.body);
    res.status(201).json({ status: 'success', code: 201, data: addedContact });
  }
});

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  const deletedContact = await contactsApi.removeContact(contactId);
  if (!deletedContact) {
    res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ code: 200, status: "success", message: 'contact deleted', data: deletedContact });
})

router.put('/:contactId', async (req, res, next) => {
  const { value: { name, email, phone }, error } = putSchema.validate(req.body);
  if (error) {
     res.status(400).json({ message: `missing fields - ${error}` });
  }
  if (name || email || phone) {
    const { contactId } = req.params;
  const updatedContact = await contactsApi.updateContact(contactId, {...req.body});
  if (updatedContact) {
    res.status(200).json({ status: "success", code: 200, data: updatedContact });
  } else {
    res.status(404).json({ message: 'Not found' });
  }
  }
})

module.exports = router
