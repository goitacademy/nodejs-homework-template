const express = require("express");
const Joi = require("@hapi/joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");
const router = express.Router();

const schema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
   const contacts = await listContacts()
   res.json(contacts)
  } catch (error) {console.log(error.message)};
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try{
  const contact = await getContactById(contactId)
    res.json(contact)
  }
    catch(error) {console.log(error.message)};
});

router.post("/", async (req, res, next) => {
  const body = schema.validate(req.body);
  if (body.error) {
    res.json({ message: body.error.message, status: "error", code: 400 });
  } else {
    try{
    const contact = await addContact(body)
      res.json(contact)
    }
      catch(error) {console.log(error.message)};
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try{
  const message = await removeContact(contactId)
    res.json(message)
  }
    catch(error) {console.log(error.message)};
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const body = schema.validate(req.body);
  if (body.error) {
    res.json({ message: body.error.message, status: "error", code: 400 });
  } else {
    try{
    const contact = await updateContact(contactId, body.value)
      res.json(contact)
    }
      catch(error) {console.log(error.message)};
  }
});

module.exports = router;
