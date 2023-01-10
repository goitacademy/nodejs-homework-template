const express = require("express");
// const contacts = require('../../models/contacts')
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
  console.log("contacts:", contacts);
  res.status(200).json(contacts);
  } catch (error) {
    console.log(error.message)
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    console.log("contact:", contact);
    return res.status(200).json(contact);
  }
  return res.status(404).json({ message: "Not found" });
});

contactsRouter.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().required(),
    phone: Joi.string().min(10).required()
  })
  const error = schema.validate(req.body)
  if (error) {
    return res.status(400).json(error.message)
  }
  const newContact = await addContact({ name, email, phone });
  console.log("newContact:", newContact);
  res.status(201).json(newContact);
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  if (contactId) {
    await removeContact(contactId);
    res.status(200).json({ message: `contact ${contactId} deleted` });
  }
  return res.status(404).json({ message: "Not found" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    return res.status(400).json({message: "missing fields"})
  }
  const updatedContact = await updateContact(contactId, { name, email, phone } )
  console.log("updated contact:", updatedContact)
  res.status(200).json(updatedContact);
});


module.exports = contactsRouter

