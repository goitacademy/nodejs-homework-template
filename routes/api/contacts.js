const express = require("express");
const { nanoid } = require("nanoid");

const router = express.Router();

const contacts = require("../../models/contacts");
const schema = require("./tools/validator");

router.get("/", async (req, res, next) => {
  const contactsList = await contacts.listContacts();
  res.json({ status: 200, body: contactsList });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (contact) {
    res.json({ status: 200, data: contact });
  } else {
    res.json({ status: 404, message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const body = {
    id: nanoid(),
    name,
    email,
    phone,
  };

  const { error } = schema.validate(body);
  if (error) {
    console.log(error.details[0].message);
    return res.json({ status: 400, message: `${error.details[0].message}` });
  }

  if (body.name && body.email && body.phone) {
    const newContact = await contacts.addContact(body);
    res.json({ status: 201, data: newContact });
  } else {
    res.json({ status: 400, message: "missing required name - field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await contacts.removeContact(contactId);

  if (contact) {
    res.json({ status: 200, message: "contact deleted" });
  } else {
    res.json({ status: 404, message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  const body = {
    name,
    email,
    phone,
  };

  const { error } = schema.validate(body);
  if (error) {
    console.log(error.details[0].message);
    return res.json({ status: 400, message: `${error.details[0].message}` });
  }

  if (body.name || body.email || body.phone) {
    const renameContact = await contacts.updateContact(contactId, body);
    if (renameContact) {
      res.json({ status: 200, body: renameContact });
    } else {
      res.json({ status: 404, message: "Not found" });
    }
  } else {
    res.json({ status: 400, message: "missing fields" });
  }
});

module.exports = router;
