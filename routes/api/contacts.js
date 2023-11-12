const express = require("express");
const contacts = require("../../controllers/contacts.js");
const {contactValidationSchema} = require("../../validation/contacts.js");


const contactValidationchema = contactValidationSchema;


const router = express.Router();

router.get("/", async (req, res) => {
  const contactList = await contacts.listContacts();
  res.status(200).json(contactList);
});

router.get("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const contact = await contacts.getContactById(contactId);
  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json( contact);
});

router.post("/", async (req, res) => {
  const { error } = contactValidationchema.validate(req.body);
  const { name, email, phone, favorite = false } = req.body;
  if (error) {
    return res
      .status(400)
      .json({ message: "missing required name, email, or phone field" });
  }


  const newContact = await contacts.addContact({ name, email, phone, favorite });

  res.status(201).json( newContact);
});


router.delete("/:contactId", async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await contacts.removeContact(contactId);
  if (!deletedContact) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "Contact deleted" });
});

router.put("/:contactId", async (req, res) => {
  const { error } = contactValidationchema.validate(req.body);
  const { contactId } = req.params;
  const { name, email, phone } = req.body;

  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }

  const updatedContact = await contacts.updateContact(contactId, {
    name,
    email,
    phone,
  });

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
});


router.patch("/:contactId/favorite", async (req, res, next) => {

  const { contactId } = req.params;
  const { favorite: body } = req.body;

  if (body === null) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const updatedStatus = await contacts.updateStatusContact(contactId, body);
  if (!updatedStatus) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json(updatedStatus);
});


module.exports = router;
