const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({ message: "template message", data: contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  contact
    ? res.status(200).json({ message: "template message", data: contact })
    : res.status(404).json({ message: "Not found id" });
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  
  const {error, value} =schema.validate(req.body)
  if (error) {
        return res.status(400).json({ message: "missing required name field" });
  }
  if(value){
  const contact = await addContact(req.body);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.status(201).json({ message: "template message", data: contact });
  }
}});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactDelete = await removeContact(contactId);
  if (!contactDelete) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.status(200).json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
  });
  
  const {error, value} =schema.validate(req.body)
  if (error) {
        return res.status(400).json({ message: "missing required name field" });
  }
  if(value){
  const body = req.body;
  const {contactId} = req.params; 
  // if(!body) {
  //   return res.status(404).json({ "message": "missing fields"});
  // }
  const contact = await updateContact(contactId, body);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  } else {
    return res.status(201).json({ message: "template message", data: contact });
  }}
});

module.exports = router;
