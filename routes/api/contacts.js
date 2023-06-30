const express = require("express");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const { contactSchema } = require("../../models/contactsJoi");

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contactById = await getContactById(id);
  if (!contactById) {
    return res.status(404).send({ message: "Not found" });
  } else {
    return res.status(200).json({ contactById });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error } = contactSchema.validate(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  if (!name || !email || !phone) {
    return res.status(404).send({ message: "missing required name - field" });
  } else {
    const newContact = await addContact(name, email, phone);
    return res
      .status(201)
      .json({ message: "Contact added", contact: newContact });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const contact = await getContactById(id);

  if (!contact) {
    return res.status(404).send({ message: "Not found" });
  } else {
    const filteredContacts = await removeContact(id);
    return res.status(200).json({
      message: `Contact deleted ID: ${contact.id}, Name: ${contact.name}, E-mail: ${contact.email}, Phone: ${contact.phone}`,
      contacts: filteredContacts,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const { name, email, phone } = req.body;
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  if (!name && !email && !phone) {
    return res.status(400).send({ message: "missing fields" });
  }
  if (name || email || phone) {
    const updatedContact = await updateContact(id, { name, email, phone });
    return res.status(200).json(updatedContact);
  } else {
    return res.status(404).send({ message: "Not found" });
  }
});

module.exports = router;
