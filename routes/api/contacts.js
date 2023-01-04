const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const list = await listContacts();
  res.json(list);
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);
  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  if (body) {
    const contact = await addContact(body);
    res.status(201).json(contact);
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  if (id) {
    const ok = await removeContact(id);
    if (ok) {
      res.json({ message: "contact deleted" });
      return;
    }
  }
  res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const body = req.body;
  if (Object.keys(body).length == 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const contact = await updateContact(id, body);
  if (contact) {
    res.status(200).json(contact);
    return;
  }
  res.status(404).json({ message: "Not found" });
});

module.exports = router;
