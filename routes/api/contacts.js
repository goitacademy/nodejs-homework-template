const express = require("express");
const {
  contactBodySchema,
  putContactsSchema,
  updateFavoriteSchema,
  Contact,
} = require("../../models/contacts");
const { isValidObjectId } = require("mongoose");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    res.status(400).json({ message: `${contactId} isn't a valid id!` });
    return;
  }
  const contact = await Contact.findById(contactId);
  if (!contact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json(contact);
});

router.post("/", async (req, res, next) => {
  const body = req.body;
  const { error } = contactBodySchema.validate(body);

  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const newContact = await Contact.create(body);

  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    res.status(400).json({ message: `${contactId} isn't a valid id!` });
    return;
  }

  const removedContact = await Contact.findByIdAndDelete(contactId);
  console.log(removedContact);
  if (!removedContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;

  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    res.status(400).json({ message: `${contactId} isn't a valid id!` });
    return;
  }

  const body = req.body;
  const { error } = putContactsSchema.validate(body);
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing fields" });
    return;
  }
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(updatedContact);
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const contactId = req.params.contactId;

  const isValid = isValidObjectId(contactId);
  if (!isValid) {
    res.status(400).json({ message: `${contactId} isn't a valid id!` });
    return;
  }

  const body = req.body;
  const { error } = updateFavoriteSchema.validate(body);
  if (Object.keys(body).length === 0) {
    res.status(400).json({ message: "missing field favorite" });
    return;
  }
  if (error) {
    res.status(400).json({ message: error.details[0].message });
    return;
  }
  const updatedContact = await Contact.findByIdAndUpdate(contactId, body, {
    new: true,
  });
  if (!updatedContact) {
    res.status(404).json({ message: "Not found" });
    return;
  }
  res.json(updatedContact);
});

module.exports = router;
