const express = require("express");

const contacts = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();

  res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const { params } = req;

  const data = await contacts.getContactById(params.contactId);

  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(data);
});

router.post("/", async (req, res, next) => {
  const {
    body: { name, phone, email },
    body,
  } = req;

  const throwError = (missedField) => {
    res.status(400).json({ message: `missing required ${missedField} field` });
  };

  if (!name) {
    return throwError("name");
  } else if (!phone) {
    return throwError("phone");
  } else if (!email) {
    return throwError("email");
  }

  const data = await contacts.addContact(body);

  res.status(201).json(data);
});

router.delete("/:contactId", async (req, res, next) => {
  const {
    params: { contactId },
  } = req;

  const data = await contacts.removeContact(contactId);

  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(data);
});

router.put("/:contactId", async (req, res, next) => {
  const {
    params: { contactId },
    body,
  } = req;

  if (!Object.keys(body).length) {
    res.status(400).json({ message: "missing fields" });
    return;
  }

  const data = await contacts.updateContact(contactId, body);

  if (!data) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(data);
});

module.exports = router;
