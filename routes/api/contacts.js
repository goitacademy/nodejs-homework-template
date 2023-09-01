const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const id = await getContactById(contactId);

  if (id) {
    return res.status(200).json(await id);
  }
  return res.status(404).json({ message: "Not found" });
});

router.post("/", async (req, res, next) => {
  if (Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Add keys: name, email and phone" });
  }
  const { name, email, phone } = req.body;
  const validation = schema.validate({ name, email, phone });
  const newContact = addContact(req.body);

  if (validation.error) {
    return res
      .status(400)
      .json({ message: `Key ${validation.error.details[0].message}` });
  }

  res.status(201).json(await newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const idToRemove = await removeContact(contactId);
  console.log(idToRemove);

  if (idToRemove) {
    return res.status(200).json({ message: "contact deleted" });
  }
  return res.status(404).json({ message: "Not found" });
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, phone, email } = req.body;
  const id = await getContactById(contactId);

  if (!id) {
    return res.status(404).json({ message: "Not found" });
  } else if (name || phone || email) {
    return res.status(200).json(await updateContact(contactId, req.body));
  } else {
    return res.status(400).json({ message: "Missing fields" });
  }
});

module.exports = router;
