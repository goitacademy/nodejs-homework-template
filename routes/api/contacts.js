const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controller/contacts");

const { addValidate, putValidate } = require("../../helpers/schema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contactsList = await listContacts();
  res.json(contactsList);
});

router.get("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  if (!foundContact) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(foundContact);
  }
});

router.post("/", async (req, res, next) => {
  if (addValidate.validate(req.body).error) {
    res.status(400).json({
      message: addValidate.validate(req.body).error.details[0].message,
    });
  } else {
    const message = await addContact(req.body);
    res.status(201).json(message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  if (!foundContact) {
    res.status(404).json({ message: "Not found" });
  } else {
    await removeContact(req.params.contactId);
    res.json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const foundContact = await getContactById(req.params.contactId);
  const error = putValidate.validate(req.body).error;
  if (!error) {
    const editedContact = await updateContact(req.params.contactId, req.body);
    res.json(editedContact);
  } else if (!foundContact) {
    res.status(404).json({ message: "Not found" });
  } else if (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
