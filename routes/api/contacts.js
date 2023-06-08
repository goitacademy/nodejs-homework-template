const express = require("express");
const mongoose = require("mongoose");
const Contact = require("../../models/contactsModel");
const Joi = require("joi").extend(require("joi-phone-number"));

const router = express.Router();

const validateObjectId = (req, res, next) => {
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }
  next();
};

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().phoneNumber().required(),
  favorite: Joi.boolean(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", validateObjectId, async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", validateObjectId, async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndRemove(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", validateObjectId, async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    const { name, email, phone } = req.body;
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { name, email, phone },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const { favorite } = req.body;
  if (favorite === undefined) {
    return res.status(400).json({ message: "Missing field favorite" });
  }
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { $set: { favorite } },
      { new: true }
    );
    if (!updatedContact) {
      return res.status(404).json({ message: "Contact not found" });
    }
    res.json(updatedContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
