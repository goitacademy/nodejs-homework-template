const express = require("express");
const { schema } = require("./schema");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    return res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (contact) return res.json(contact);
    res
      .status(404)
      .json({ message: `Contact with id=${req.params.contactId} not found!` });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  try {
    if (error)
      return res.status(400).json({ message: error.details[0].message });
    const { name, email, phone } = req.body;

    if (!name || !email || !phone)
      return res.status(400).json({ message: "missing required name field" });
    const newContact = await addContact(req.body);

    return res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removedContact = await removeContact(req.params.contactId);
    if (removedContact) return res.json({ message: "contact deleted" });

    res
      .status(404)
      .json({ message: `Contact with id=${req.params.contactId} not found!` });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  try {
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, phone } = req.body;

    if (!name && !email && !phone)
      return res.status(400).json({ message: "missing fields" });
    const response = await updateContact(req.params.contactId, req.body);

    if (response) return res.json(response);
    return res
      .status(404)
      .json({ message: `Contact with id=${req.params.contactId} not found!` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
