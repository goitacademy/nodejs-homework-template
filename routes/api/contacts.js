const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");
const router = express.Router();
const schemaValidate = require("../../schemas/contactsvalidate");


router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemaValidate.validate(req.body);
    if (error) {
      const missingField = error.details[0].context.label;
      return res.status(400).json({
        message: `Missing required ${missingField} field`,
      });
    }

    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = schemaValidate.validate(req.body);

    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        message: "Missing fields",
      });
    }
    if (error) {
      const missingField = error.details[0].context.label;
      return res.status(400).json({
        message: `Missing required ${missingField} field`,
      });
    }

    const updatedContact = await updateContact(contactId, req.body);
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contactById = await getContactById(contactId);
    if (!contactById) {
      return res.status(404).json({ message: "Contact not found" });
    }

    await removeContact(contactId);
    res.status(200);
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
