const express = require("express");

const {
  contactAddSchema,
  contactUpdateSchema,
} = require("../../schemas/contacts.js");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const response = contactAddSchema.validate(req.body, { abortEarly: false });

  let message = "";

  if (typeof response.error !== "undefined") {
    response.error.details.forEach((err, index) => {
      if (index === 0) {
        message += err.message;
      } else {
        message += ", " + err.message;
      }
    });
    res.status(400).json({ message });
    return;
  }
  const newContact = await addContact(req.body);
  res.status(201).json(newContact);
  
});

router.delete("/:contactId", async (req, res, next) => {
  const deletedContact = await removeContact(req.params.contactId);
  deletedContact
    ? res.status(200).json({ message: "contact deleted" })
    : res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });

    return;
  }
  const response = contactUpdateSchema.validate(req.body, {
    abortEarly: false,
  });
  let message = "";

  if (typeof response.error !== "undefined") {
    response.error.details.forEach((err, index) => {
      if (index === 0) {
        message += err.message;
      } else {
        message += ", " + err.message;
      }
    });
    res.status(400).json({ message });
    return;
  }
  const updatedContact = await updateContact(req.params.contactId, req.body);

  if (updatedContact === null) {
    res.status(404).json({ message: "Not Found" });
    return;
  }

  res.status(200).json(updatedContact);
});

module.exports = router;
