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

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

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

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;

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

  // const newContact = { id, name, email, phone };
  try {
    const updatedContact = await updateContact(id, { name, email, phone });
    return res.status(200).json(updatedContact);
  } catch {
    return res.status(500).send("Something went wrong");
  }
});

module.exports = router;
