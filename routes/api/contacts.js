const express = require("express");
const Contact = require("../models/Contact");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find({});
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndDelete(req.params.contactId);
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    if (req.body.favorite === undefined) {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const contact = await Contact.findByIdAndUpdate(
      req.params.contactId,
      { favorite: req.body.favorite },
      { new: true }
    );
    if (!contact) {
      return res.status(404).json({ message: "Not found" });
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
