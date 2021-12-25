const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const { Contact } = require("../../model");
const { joiSchema } = require("../../model/contact");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contacts = await Contact.findById(contactId);
    if (!contacts) {
      throw new createError(404, "Not found");
    }
    res.json(contacts);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 404;
    }
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContacts = await Contact.findByIdAndRemove(contactId);
    console.log(deleteContacts);
    if (!deleteContacts) {
      throw new createError(404, "Not found");
    }
    res.json({ message: "contact delete" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateContacts = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!updateContacts) {
      throw new createError(404, "Not found");
    }
    res.json(updateContacts);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 404;
    }
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (error) {
      error.status = 400;
      throw error;
    }

    const updateContacts = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updateContacts) {
      throw new createError(404, "Not found");
    }
    res.json(updateContacts);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 404;
    }
    next(error);
  }
});

module.exports = router;
