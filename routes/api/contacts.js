const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");
const router = express.Router();

const contactSchema = require("../../schemas/contacts.js");

const { isError } = require("joi");
router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsModule.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    if (!contact) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.status(200).json(contact);
  } catch (error) {
    туче(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing required name field" });
      return;
    }
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);
    res.status(201).json({ id: newContact.id, name, email, phone });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const result = await removeContact(contactId);
  if (result.message === "Not found") {
    res.status(404).json(result);
    return;
  }
  res.status(200).json(result);
});

router.put("/:contactId", async (req, res, next) => {
  const error = contactSchema.validate(req.body);

  if (typeof error.error !== "undefined") {
    return res.status(400).json({ message: "missing required name field" });
  }
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    const contact = await updateContact(contactId, {
      name,
      email,
      phone,
    });

    if (contact) {
      res.status(200).json(contact);
    }
  } catch (error) {
    throw { status: 404, message: "Not found" };
  }
});

module.exports = router;
