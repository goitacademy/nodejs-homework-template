const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contacts = [
  { name: "Karol Kowalewicz", email: "karol@example.com", phone: "123-456-7890" },
  { name: "Jane Johanson", email: "jane@example.com", phone: "987-654-3210" },
];

const formattedContacts = contacts.map((contact) => {
  return {
    name: contact.name,
    email: contact.email,
    phone: contact.phone,
  };
});

router.get("/", async (req, res, next) => {
  res.status(200).json({ contacts: formattedContacts });
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = contacts.find((contact) => contact.id === contactId);

  if (contact) {
    res.status(200).json({ message: "Find contact", contact });
  } else {
    res.status(404).json({ message: "A contact with this id does not exist" });
  }
});

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.post("/", async (req, res, next) => {
  const { error } = contactSchema.validate(req.body);
  if (error) {
    res.status(400).json({ message: error.details[0].message });
  } else {
    const { name, email, phone } = req.body;
    const newContact = {
      id: Date.now().toString(),
      name,
      email,
      phone,
    };
    contacts.push(newContact);
    formattedContacts.push(newContact);
    res
      .status(201)
      .json({ message: "Add new contact", contact: newContact });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const indexToRemove = contacts.findIndex(
    (contact) => contact.id === contactId
  );
  if (indexToRemove !== -1) {
    contacts.splice(indexToRemove, 1);
    const indexToRemoveFormatted = formattedContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (indexToRemoveFormatted !== -1) {
      formattedContacts.splice(indexToRemoveFormatted, 1);
    }
    res.status(200).json({ message: `Delete contact: ${contactId}` });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const updatedContact = contacts.find((contact) => contact.id === contactId);

  if (updatedContact) {
    updatedContact.name = req.body.name;
    updatedContact.email = req.body.email;
    updatedContact.phone = req.body.phone;

    const indexToUpdateFormatted = formattedContacts.findIndex(
      (contact) => contact.id === contactId
    );
    if (indexToUpdateFormatted !== -1) {
      formattedContacts[indexToUpdateFormatted] = updatedContact;
    }

    res.status(200).json({
      message: `Update contact: ${contactId}`,
      contact: updatedContact,
    });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

module.exports = router;
