const express = require("express");
const Joi = require("joi");
const Schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    await res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { error } = await Schema.validate(req.body);

  try {
    if (error) {
      return res
        .status(400)
        .json({ message: `missing required ${error.message} field` });
    }

    const contact = await addContact(req.body);
    await res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await removeContact(contactId);
    if (!deletedContact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  if (!body) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { contactId } = req.params;
  const { error } = await Schema.validate(body);
  if (error) {
    return res.status(400).json({ message: "missing required name field" });
  }
  try {
    const contact = await updateContact(contactId, body);
    if (!contact) {
      return res.status(400).json({ message: "Not found" });
    }
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
