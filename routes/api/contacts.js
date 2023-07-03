const express = require("express");

const contactsModel = require("../../models/contacts");

const router = express.Router();

const { httpError } = require("../../helpers");
const Contact = require("../../models/contacts");

// const Joi = require("joi");

// const addSchema = Joi.object({
//   name: Joi.string().required(),
//   email: Joi.string().email().required(),
//   phone: Joi.string().required(),
// });

// const updateSchema = Joi.object({
//   favorite: Joi.boolean(),
// });

router.get("/", async (req, res, next) => {
  try {
    // const contacts = await contactsModel.listContacts();
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await Contact.findById(id);
    if (!result) {
      throw httpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }

    const result = await Contact.create(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const id = req.params.contactId;
  const result = await Contact.findByIdAndRemove(id);
  if (!result) {
    throw httpError(404, "Contact not found");
  }
  res.json({ message: "Contact deleted successfully", contact: result });
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;

  try {
    const { error } = addSchema.validate(body);
    if (error) {
      throw httpError(400, error.message);
    }
    const id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw httpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  try {
    const { error } = updateSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }
    const id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw httpError(404, "Contact not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
