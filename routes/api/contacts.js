const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
} = require("../../models/contacts");
const app = express();
const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.send(data);
  next();
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await getContactById(contactId);
  if (!data) {
    return next();
  }
  res.send(data);
});

router.post("/", async (req, res, next) => {
  const updContacts = await addContact(req.body);
  res.status(201).json(updContacts);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
