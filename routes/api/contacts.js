const { Router } = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts.js");
const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: true } })
    .required(),
  phone: Joi.string()
    .pattern(/^(\(\d{3}\) \d{3}\-\d{4}|\d{3}\-\d{3}\-\d{4}|\d{9}|\d{10})$/)
    .required(),
});

const contactsRouter = Router();

contactsRouter.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  return res.status(200).json(contacts);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const requestedContact = await getContactById(req.params.contactId);

  if (!requestedContact) return res.status(404).send({ message: "Not found" });
  return res.status(200).json(requestedContact);
});

contactsRouter.post("/", async (req, res, next) => {
  const user = req.body;
  try {
    Joi.attempt(user, schema);
    const newUser = await addContact(user);
    return res.status(201).json({ newUser });
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const contactToDeleteID = req.params.contactId;

  if (!contactToDeleteID) {
    return res.status(404).send("Not found");
  } else {
    await removeContact(contactToDeleteID);
    return res.status(200).json("Contact deleted");
  }
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  const updateSchema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: true } }),
    phone: Joi.string().pattern(
      /^(\(\d{3}\) \d{3}\-\d{4}|\d{3}\-\d{3}\-\d{4}|\d{9}|\d{10})$/
    ),
  });
  try {
    const id = req.params.contactId;
    const body = req.body;

    Joi.attempt(body, updateSchema);
    const updatedContact = await updateContact(id, body);
    return res.status(200).json(updatedContact);
  } catch (error) {
    return res.status(400).send(error.details[0].message);
  }
});

module.exports = contactsRouter;
