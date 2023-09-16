const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
} = require("../../services/contacts.service");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ status: "Success", code: 200, contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (!contact) {
    res
      .status(404)
      .json({ status: "Bad Request", code: 404, message: "Contact not found" });
  } else {
    res.status(200).json({ status: "Success", code: 200, contact });
  }
});

router.post("/", async (req, res, next) => {
  const newContact = await addContact(req.body);
  res.status(201).json({ status: "Success", code: 201, newContact });
});

router.delete("/:contactId", async (req, res, next) => {
  const filteredList = await removeContact(req.params.contactId);
  res.status(204).json({ status: "No Content", code: "204", filteredList });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
