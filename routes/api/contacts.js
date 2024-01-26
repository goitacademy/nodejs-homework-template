const express = require("express");
const { Contact } = require("../../contact.schema");
const {
  listContacts,
  getContactById,
  addContact,
  updateStatusContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contactById = await getContactById(req.params.contactId);
  if (contactById == null) {
    res.status(400);
    res.json({ message: "Not found" });
  } else {
    res.json(contactById);
  }
});

router.post("/", async (req, res, next) => {
  if (
    Object.hasOwn(req.body, "name") &&
    Object.hasOwn(req.body, "email") &&
    Object.hasOwn(req.body, "phone")
  ) {
    await addContact(req.body);
    res.status(201);
    res.json(req.body);
  } else {
    res.status(400);
    res.json({ message: "missing required name - field" });
  }
});

router.patch("/:contactId/favorite", async (req, res) => {
  console.log(req.body);
  if (req.body == null || !Object.hasOwn(req.body, "favorite")) {
    res.status(400);
    res.json({ message: "missing field favorite" });
    return;
  }
  const contact = await updateStatusContact(req.params.contactId, req.body);
  res.json(contact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contactDeleted = await removeContact(req.params.contactId);
  if (contactDeleted != null) {
    res.json({ message: "Contact deleted" });
  } else {
    res.status(404);
    res.json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  if (
    Object.hasOwn(req.body, "name") ||
    Object.hasOwn(req.body, "email") ||
    Object.hasOwn(req.body, "phone") ||
    Object.hasOwn(req.body, "favorite")
  ) {
    const contactUpdated = await updateContact(req.params.contactId, req.body);
    if (contactUpdated) res.json(contactUpdated);
  } else {
    res.status(404);
    res.json({ message: "Not found" });
  }
});

module.exports = router;
