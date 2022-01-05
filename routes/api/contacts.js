const express = require("express");
const createError = require("http-errors");
const router = express.Router();

const { NotFound } = require("http-errors");
const { authenticate } = require("../../midlwares");

const { Contact } = require("../../model");
const { joiSchema } = require("../../model/contact");

router.get("/", authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { _id } = req.user;
    const skip = (page - 1) * limit;
    const contacts = await Contact.find({ owner: _id }, "", {
      skip,
      limit: +limit,
    });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new NotFound();
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    const { _id } = req.user;
    if (error) {
      throw new Error();
    }
    const newCcontact = await Contact.create({ ...req.body, owner: _id });
    res.status(201).json(newCcontact);
  } catch (error) {
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removeContact = await Contact.findByIdAndRemove(req.params.contactId);
    if (!removeContact) {
      throw new NotFound();
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const updateContact = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!updateContact) {
      throw new NotFound();
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { favorite } = req.body;
    if (!favorite) {
      throw createError(400, " missing field favorite");
    }

    const updateContact = await Contact.findByIdAndUpdate(
      contactId,
      { favorite },
      { new: true },
    );

    res.json(updateContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
