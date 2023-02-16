const express = require("express");
const { v4: uuidv4 } = require("node-uuid");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();
router.get("/", async (req, res, next) => {
  res.json(await listContacts());
  console.log(req.query);
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (data.length === 0) {
    res.status(404).json({ message: "not found" });
    return;
  }
  res.json(data);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({ message: "missing required name field" });
  }
  const contact = { id: uuidv4(), name, email, phone };
  const data = await addContact(contact);
  res.status(201).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
  const contacts = await listContacts();
  if (contacts.every(({ id }) => id !== req.params.contactId)) {
    return res.status(404).json({ message: "Not found" });
  }
  const data = await removeContact(req.params.contactId);
  res.json({
    message: `Contact with ID:${data.id} name:${data.name} deleted!`,
  });
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  if (name || email || phone) {
    const data = await updateContact(req.params.contactId, req.body);
    if (!data) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.json(data);
  }
  return res.status(400).json({ message: "missing required name field" });
});

module.exports = router;
