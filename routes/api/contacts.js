const express = require("express");
const Joi = require("joi");
const { listContacts, getContactById, addContact, removeContact, updateContact } = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

/* This code is defining a route handler for a GET request to the root URL ("/"). */
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

/* This code is defining a route handler for a GET request to the "/:contactId" URL. It expects a
parameter called "contactId" in the URL. */
router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const getContact = await getContactById(contactId);

  if (getContact) {
    res.status(200).json(getContact);
  } else {
    res.status(404).json({ message: "Contact not found" });
  }
});

/* This code is defining a route handler for a POST request to the root URL ("/"). */
router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;

  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "Missing required name field" });
  }

  try {
    const newContact = await addContact({ name, email, phone });
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

/* This code is defining a route handler for a DELETE request to the "/:contactId" URL. It expects a
parameter called "contactId" in the URL. */
router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deleteContact = await removeContact(contactId);

    if (deleteContact) {
      res.status(200).json({ message: "Contact deleted" });
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
});

/* This code is defining a route handler for a PUT request to the "/:contactId" URL. It expects a
parameter called "contactId" in the URL. */
router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const editContact = await updateContact(contactId, { name, email, phone });

    if (editContact) {
      res.status(200).json(editContact);
    } else {
      res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;