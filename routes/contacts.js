const express = require("express");
const router = express.Router();
const Contact = require("../models/contacts.model");
const Joi = require("joi");
const auth = require("./auth");

const contactSchema = Joi.object({
  name: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(9).required(),
  favorite: Joi.boolean(),
});
router.use(auth);

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({ owner: req.user._id });
    res.json({ status: "success", code: 200, data: { contacts } });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contact.findOne({
      _id: req.params.contactId,
      owner: req.user._id,
    });
    if (contact) {
      res.json({ status: "success", code: 200, data: { contact } });
    } else {
      res.json({ status: "error", code: 404, message: "Not found" });
    }
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const value = await contactSchema.validateAsync(req.body);
    const newContact = new Contact({ ...value, owner: req.user._id });
    await newContact.save();
    res.status(201).json({ status: "success", code: 201, data: { newContact } });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contact.findOneAndDelete({
      _id: req.params.contactId,
      owner: req.user._id,
    });
    if (contact) {
      res.json({ status: "success", code: 200, message: "Contact deleted" });
    } else {
      res.json({ status: "error", code: 404, message: "Not found" });
    }
  } catch (e) {
    next(e);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const value = await contactSchema.validateAsync(req.body);
    const updatedContact = await Contact.findOneAndUpdate(
      { _id: req.params.contactId, owner: req.user._id },
      value,
      { new: true }
    );
    if (updatedContact) {
      res.json({ status: "success", code: 200, data: { updatedContact } });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;