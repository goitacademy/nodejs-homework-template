const express = require("express");
const contacts = require("../../models/contacts");

const { contactValidate } = require("../tools/validator");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.json({ status: 200, body: contactsList });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const getContact = await contacts.getContactById(contactId);
  if (!getContact) res.status(404).json({ message: "Not found" });
  res.json({ status: 200, data: getContact });
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const { error } = contactValidate(body);

  if (error) {
    return res.json({ status: 400, message: "missing required name field" });
  }
  const newContact = await contacts.generateNewContact(body);
  await contacts.addContact(req.body);
  res.json({ status: 201, data: newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const deleteContact = await contacts.removeContact(contactId);
  if (deleteContact) {
    res.json({ status: 200, data: deleteContact, message: "contact deleted" });
  } else {
    res.json({ status: 404, message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  const { error } = contactValidate(body);

  if (error) {
    return res.json({ status: 400, message: "missing fields" });
  }

  const renameContact = await contacts.updateContact(contactId, body);

  if (renameContact) {
    res.json({ status: 200, data: renameContact });
  } else {
    res.json({ status: 404, message: "Not found" });
  }
});

module.exports = router;
