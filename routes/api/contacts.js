const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  shemaForCreate,
  schemaForUpdate,
} = require("../../models/contactsSchema");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = JSON.parse(await listContacts());
  res.status(200).json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const candidate = await getContactById(req.params.contactId);
  if (candidate) {
    res.status(200).json(candidate);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { error } = shemaForCreate.validate(req.body);
  if (error) {
    res.status(500).json(error);
  } else {
    const newContact = await addContact(req.body);
    if (newContact) {
      res.status(201).json(newContact);
    } else {
      res.status(500).json({ message: "Error" });
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const result = await removeContact(req.params.contactId);
  if (result) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "No contact found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = schemaForUpdate.validate(req.body);
  if (error) {
    res.status(500).json(error);
  } else {
    const updatedItem = await updateContact(req.params.contactId, req.body);
    if (updatedItem) {
      res.status(200).json(updatedItem);
    } else {
      res.status(404).json({
        message: "No update contact found",
      });
    }
  }
});

module.exports = router;
