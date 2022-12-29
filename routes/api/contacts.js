const express = require("express");
const {
  getContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");
const {
  contactSchema,
} = require("../../utils/validation/postContactValidationSchema.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await getContacts();
    res.status(200).json({ contacts });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ contact });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: "validation error" });
    }
    const contact = await addContact(req.body);
    return res.status(201).json({ contact });
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const deletedContact = await getContacts().then((contacts) =>
      contacts.find((contact) => contact.id === req.params.contactId.toString())
    );
    if (!deletedContact) {
      res.status(404).json({ message: "Not found" });
      return null;
    }
    await removeContact(req.params.contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "validation error" });
    }
    const { contactId } = req.params;
    const result = await updateContact(contactId, req.body);

    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ result });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
