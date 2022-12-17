const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  return res.status(200).json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const contact = await getContactById(contactId);

  return contact
    ? res.status(200).json(contact)
    : res.status(404).json({ message: "Not found contact" });
});

router.post("/", async (req, res, next) => {
  try {
    const userRequest = await req.body;
    const value = await schemaCreate.validateAsync(userRequest);
    const data = await addContact(value);

    return res.status(201).json(data);
  } catch (error) {
    return res.status(400).json(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const isDeleted = await removeContact(contactId);
  return isDeleted
    ? res.status(200).json({ message: "Contact deleted" })
    : res.status(404).json({ message: "Not found contact" });
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const userRequest = await req.body;
  try {
    const value = await schemaUpdate.validateAsync(userRequest);
    const data = await updateContact(contactId, value);

    return data
      ? res.status(200).json(data)
      : res.status(404).json({ message: "Not found contact" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
});
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const schemaUpdate = Joi.object({
  name: Joi.string().alphanum(),
  email: Joi.string().email(),
  phone: Joi.string()
    .pattern(phoneRegExp)
    .message("Phone number must be min 6 numbers length"),
}).min(1);

const schemaCreate = Joi.object({
  name: Joi.string().required().alphanum(),
  email: Joi.string().email().required(),
  phone: Joi.string().pattern(phoneRegExp).required(),
});

module.exports = router;
