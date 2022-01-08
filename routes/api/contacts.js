const express = require('express');
const { NotFound, BadRequest } = require("http-errors");

const { joiSchema } = require("../../models/contact");
const { Contact } = require("../../models");


const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
})


router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new NotFound();
    }
    res.json(contact);
  } catch (error) {
    if (error.message.includes("Cast to ObjectId failed")) {
      error.status = 404;
    }
    next(error);
  }
})


router.post('/', async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }

    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact)
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
})


router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { contactId } = req.params;
    const updateContact = await Contact.findByIdAndUpdate(
      contactId,
      req.body,
      { new: true }
    );
    if (!updateContact) {
      throw new NotFound();
    }
    res.json(updateContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
})


router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    const updateContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true }
    );
    if (!updateContact) {
      throw new NotFound();
    }
    res.json(updateContact);
  } catch (error) {
    if (error.message.includes("validation failed")) {
      error.status = 400;
    }
    next(error);
  }
})


router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await Contact.findByIdAndRemove(contactId);
    if (!deleteContact) {
      throw new NotFound();
    }
    res.json("message: contact deleted");
  } catch (error) {
    next(error);
  }
});

module.exports = router;



