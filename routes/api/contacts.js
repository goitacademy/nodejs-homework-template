const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../controllers/contacts");


router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
});


router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const contact = await getContactById(id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});


router.post("/", async (req, res) => {
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
});


router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedContact = await updateContact(id, req.body);
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});


router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await removeContact(id);
  if (result) {
    res.json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});

module.exports = router;
