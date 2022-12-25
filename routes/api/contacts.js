const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200);
  res.json(contacts);
  next();
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  res.status(200);
  res.json(contact);
  next();
});

router.post("/", async (req, res, next) => {
  req.body = {
    id: new Date(),
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  if (!req.body) {
    return res.json({ status: 400, message: "Body parameter is required" });
  }
  const contact = await addContact(req.body);
  res.status(200);
  res.json({ message: `Contact ${contact.name} was successfully added` });
  next();
});

router.delete("/:contactId", async (req, res, next) => {
  const contact = await removeContact(req.params.contactId);
  res.status(200);
  res.json({ message: `Contact ${contact.name} was successfully deleted` });
  next();
});

router.put("/:contactId", async (req, res, next) => {
  req.body = {
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
  };
  const contact = await updateContact(req.body);
  res.status(200);
  res.json({ message: `Contact ${contact.name} was successfully changed` });
  next();
});

module.exports = router;
