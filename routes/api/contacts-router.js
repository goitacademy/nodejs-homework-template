const express = require("express");

const contactAddSchema = require('../../schemas/contactSchema')
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

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
    if (!contact) {
      throw HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = contactAddSchema.validate(data);
    if (error) {
      throw HttpError(400, error.message);
    }
    const contact = await addContact(data);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (!contact) {
      throw HttpError(404);
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const data = req.body;
    const fieldsQuantity = Object.keys(data).length;
    if (!fieldsQuantity) {
      return res.status(400).json({ message: "missing fields" });
    }
    const { error } = contactAddSchema.validate(data);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const contact = await updateContact(contactId, data);
    if (!contact) {
      throw HttpError(404, `Contact with id=${contactId} not found`);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
