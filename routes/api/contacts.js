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

const validateContact = (data) => {
  const schema = Joi.object({
    name: Joi.string().required().error(new Error('Missing required name field')),
    email: Joi.string().email().required().error(new Error('Missing required email field')),
    phone: Joi.string().required().error(new Error('Missing required phone field')),
  });

  return schema.validate(data, { abortEarly: false });
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

router.post("/", async (req, res) => {
  try {
    await validateContact(req.body);

    const newContact = await addContact({ ...req.body, id: uniqueId() });
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
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
    res.status(400).json({ message: "Missing fields" });
    return;
  }

  try {
    await validateContact(req.body);

    const updatedFields = req.body;
    const updatedContact = await updateContact(contactId, updatedFields);

    if (updatedContact) {
      res.json(updatedContact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;
