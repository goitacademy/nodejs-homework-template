const express = require("express");
const contacts = require("../../models/contacts");
const {
  validateAddContact,
  validateUpdateContact,
} = require("./validator");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.json({ status: 200, body: contactsList });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const getContact = await contacts.getContactById(contactId);
  if (getContact) {
    res.json({ status: 200, data: getContact });
  } else {
    res.json({ status: 404, message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const { error, value } = validateAddContact(body);

  if (error) {
    console.log(error);
    return res.json({ status: 400, message: "missing required name field" });
  }

  const newContact = await contacts.addContact(body);
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
  const { error, value } = validateUpdateContact(body);

  if (error) {
    console.log(error);
    return res.json({ status: 400, message: "missing fields" });
  }

  console.log(body);
  const renameContact = await contacts.updateContact(contactId, body);

  if (renameContact) {
    res.json({ status: 200, data: renameContact });
  } else {
    res.json({ status: 404, message: "Not found" });
  }
});

module.exports = router;