const express = require("express");
const Joi = require("joi");

const { Contact } = require("../../models/contact");

const { schemas } = require("../../middlewares/validationJoi");

const { HttpError } = require("../../helpers");

const { isValidId } = require("../../middlewares");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await Contact.find();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", isValidId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await Contact.findById(id);

    if (!contactById) {
      throw HttpError(404, `Contacts with id : ${id} not found`);
    }
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schemas.contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const newContact = await Contact.create(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", isValidId, async (req, res, next) => {
  try {
    const { id } = req.params;
    const delContact = await Contact.findByIdAndDelete(id);
    if (!delContact) {
      throw HttpError(404, `Contacts with id : ${id} not found`);
    }

    res.json({ message: "Delete success" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", isValidId, async (req, res, next) => {
  try {
    const { error } = schemas.contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const newContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!newContact) {
      throw HttpError(404, `Contacts with id : ${id} not found`);
    }
    res.json(newContact);
  } catch (error) {
    next(error);
  }
});

router.patch("/:id/favorite", isValidId, async (req, res, next) => {
  try {
    const { error } = schemas.updateFavoriteSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing field favorite");
    }
    const { id } = req.params;
    const newContact = await Contact.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!newContact) {
      throw HttpError(404, " Not found ");
    }
    res.json(newContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
