const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { contactValidator } = require("./../../utils/validators/validator");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    console.log("GET /", contacts);
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const contact = await addContact(req.body);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(400).json({ message: "missing required name field" });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await removeContact(contactId);
    if (contact) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactValidator(req.body);
    if (error)
      return res.status(400).json({ message: error.details[0].message });

    const { name, email, phone } = req.body;
    const { contactId } = req.params;
    if (!name && !email && !phone) {
      res.status(400).json({ message: "missing fields" });
    }

    const contact = await updateContact(contactId, req.body);
    if (contact) {
      res.status(200).json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
