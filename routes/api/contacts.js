const express = require("express");
const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { HttpError } = require("../../helpers/helpers");

router.get("/", async (req, res, next) => {
  const { limit } = req.query;
  const contacts = await listContacts({ limit });
  return res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(200).json(contact);
});

router.post("/", async (req, res, next) => {
  const newContact = await addContact(req.body);
  if (!newContact) {
    return next(HttpError(404, "Not found"));
  }
  return res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactToDelete = await getContactById(contactId);
  if (!contactToDelete) {
    return next(HttpError(404, "Not found"));
  }
  await removeContact(contactId);
  return res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  if (req.body.length === 0) {
    return next(HttpError(4004, "Missing fields"));
  }
  const { contactId } = req.params;
  const contactToUpdate = await getContactById(contactId);
  if (!contactToUpdate) {
    return next(HttpError(404, "Not found"));
  }
  const updatedContact = await updateContact(contactId, req.body);
  return res.status(200).json(updatedContact);
});

module.exports = router;
