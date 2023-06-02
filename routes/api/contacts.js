
const express = require("express");
const router = express.Router();
const {
  listContacts,
  getById,
  addContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../models/contacts");



router.get("/", async (req, res, next) => {
  res.json(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getById(id);
  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Contact with this id not found" });
  }
});

router.patch("/:contactId/favorite", async (req, res) => {
  const contactId = req.params.contactId;
  const { favorite } = req.body;

  if (favorite === undefined) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  try {
    const updatedContact = await updateStatusContact(contactId, favorite);
    res.json(updatedContact);
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const contact = await addContact(body);
  if (contact) {
    res.status(201).json(body);
  } else {
    res.status(400).json({ message: "missing required fields" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = removeContact(id);
  if (contact) {
    res.json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res) => {
  const id = req.params.contactId;
  const body = req.body;
  const updatedContact = await updateContact(id, body);
  if (updatedContact) {
    res.json(updatedContact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
