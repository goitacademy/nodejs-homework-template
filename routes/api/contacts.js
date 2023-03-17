const express = require("express");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../controllers/contacts");
const { contactSchema } = require("../../models/contact");

const router = express.Router();

// all contact view
router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

// find contact by ID
router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await getContactById(id);
    if (!contact) {
      return res.status(404).send("Contact not found");
    }
    return res.status(200).json(contact);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

// add contact
router.post("/", (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    const { name, email, phone } = req.body;
    const contact = addContact(name, email, phone);

    return res.status(201).json(contact);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

// delete contact
router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return res.status(404).send("Not found");
  }
  try {
    removeContact(id);
    return res.status(204).send();
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

// updated contact
router.put("/:id", (req, res, next) => {
  const { id, name, email, phone } = req.query;
  if (!id) {
    return res.status(400).send("ID is required to perform delete");
  }
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  const contact = getContactById(id);
  if (!contact) {
    return res.status(404).send("Contact not found");
  }

  try {
    updateContact(id, name, email, phone, req.body);
    return res.status(200).send("Contact successfully updated");
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
