const express = require("express");
const isEmpty = require("lodash.isempty");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.use("/:contactId", async (req, res, next) => {
  if (req.method === "GET") {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });

    req.contact = contact;
  }

  next();
});

router.use("/", async (req, res, next) => {
  if (req.method === "POST") {
  }

  next();
});

router.get("/", async (_, res) => {
  try {
    const contacts = await listContacts();

    res.json({ data: contacts });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contact } = req;

    res.json({ data: contact });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const contact = await addContact(body);
    res.status(201).json({ data: { ...contact } });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId);

    if (!result) res.status(404).json({ message: "Not found" });
    res.json({ message: "contact deleted" });
  } catch (err) {}
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;

    if (isEmpty(body)) res.status(400).json({ message: "missing fields" });

    const result = await updateContact(contactId, body);

    if (!result) res.status(404).json({ message: "Not found" });

    res.json({ data: { ...result } });
  } catch (err) {}
});

module.exports = router;
