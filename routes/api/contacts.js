const express = require("express");
const catchAsync = require("../../utils/catchAsync");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { createContactsDataValidator } = require("../../utils/contactsValidator");
const router = express.Router();

router.get(
  "/",
  catchAsync(async (req, res, next) => {
    const contacts = await listContacts();
    res.status(200).json({
      contacts,
    });
  })
);

router.get(
  "/:contactId",
  catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.status(200).json({
      contact,
    });
  })
);

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const { error, value } = createContactsDataValidator(req.body);
    if (error) return res.status(400).json({ message: "missing required name field" });
    const newContact = await addContact(value);
    res.status(201).json({
      contact: newContact,
    });
  })
);

router.delete(
  "/:contactId",
  catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "contact deleted" });
  })
);

router.put(
  "/:contactId",
  catchAsync(async (req, res, next) => {
    const { contactId } = req.params;
    const { error, value } = createContactsDataValidator(req.body);
    if (error) return res.status(400).json({ message: "missing fields" });
    const updatedContact = await updateContact(contactId, value);
    if (!updatedContact) return res.status(404).json({ message: "Not found" });
    res.status(200).json({
      contact: updatedContact,
    });
  })
);

module.exports = router;
