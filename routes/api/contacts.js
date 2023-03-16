const express = require('express')
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const {
  validateContact,
  validateUpdateContact
} = require("../../models/validation");
const router = express.Router()

router.get('/', async (req, res) => {
  const data = await listContacts();
  res.json(data);
});

router.get('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(data);
});

router.post('/', validateContact, async (req, res) => {
  if (req.error) {
    res.status(400).json({ message: req.error });
    return;
  }
  const data = await addContact(value);
  res.status(201).json(data);
})

router.delete('/:contactId', async (req, res) => {
  const { contactId } = req.params;
  const data = await removeContact(contactId);
  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json({ message: "Contact deleted" });
});

router.put('/:contactId', validateUpdateContact, async (req, res) => {
  const { contactId } = req.params;

  const data = await updateContact(contactId, value);

  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.status(200).json(data);
});

module.exports = router;
