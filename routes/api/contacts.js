const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("./contacts");
const router = express.Router();

router.get("/api/contacts", async (req, res, next) => {
  res.json({ message: "template message" });
  await listContacts();
});

router.get("/api/contacts/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
  await getContactById(req);
});

router.post("/api/contacts", async (req, res, next) => {
  res.json({ message: "template message" });
  await addContact(req);
});

router.delete("/api/contacts/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
  await removeContact(req);
});

router.put("/api/contacts/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
  await updateContact(req, res);
});

module.exports = router;
