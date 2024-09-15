const express = require("express");

const router = express.Router();

const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const list = await contacts.listContacts();
  res.status(200).json(list);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await contacts.getContactById(req.params.contactId);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  ["name", "email", "phone"].map((key) => {
    if (!Object.keys(req.body).includes(key)) {
      res.status(400).json({ message: `missing required '${key}' field` });
      return;
    }
  });
  const contact = await contacts.addContact(req.body);
  contact
    ? res.status(201).json(contact)
    : res.status(400).json({ message: "wrong data" });
});

router.delete("/:contactId", async (req, res, next) => {
  const contactToDelete = req.params.contactId;
  (await contacts.removeContact(contactToDelete))
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  const contact = await contacts.updateContact(req.params.contactId, req.body);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
});
module.exports = router;
