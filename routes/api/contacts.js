const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();
const schema = Joi.object({
  name: Joi.string().required().error(new Error("missing required name field")),
  email: Joi.string()
    .required()
    .error(new Error("missing required email field")),
  phone: Joi.string()
    .required()
    .error(new Error("missing required phone field")),
});
const validateContact = (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    const error = new Error("missing fields");
    error.status = 400;
    return res.status(400).json({ message: error.message });
  }
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.message });
  }
  next();
};

router.get("/", async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact) {
    res.json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", validateContact, async (req, res) => {
  try {
    const newContact = await addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    if (error.name === "ValidationError") {
      const errorMessage = error.details
        .map((detail) => detail.message)
        .join(", ");
      res.status(400).json({ message: errorMessage });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (contact) {
    await removeContact(contactId);
    res.json({ message: "Contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res) => {
  const { contactId } = req.params;

  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Missing fields" });
  }

  try {
    const updatedFields = req.body;
    const updatedContact = await updateContact(contactId, updatedFields);

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
