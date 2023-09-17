const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { addSchema, putSchema } = require("../../schema/schema");

const router = express.Router("api/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
      next();
    }

    res.status(200).json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing required name field" });
    }

    const contact = await addContact(req.body);

    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const deleteMessage = await removeContact(req.params.contactId);

    if (!deleteMessage) {
      next();
    }

    res.status(200).json(deleteMessage);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = putSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ message: "missing fields" });
    }

    const contact = await updateContact(req.params.contactId, req.body);

    if (!contact) return next();

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
