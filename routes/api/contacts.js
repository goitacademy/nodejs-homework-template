const express = require("express");
const joi = require("joi");
const createError = require("./helpers/index");
const contacts = require("../../models/contacts")

const router = express.Router();

const contactsSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().required(),
  phone: joi.string().required(),
  favorite: joi.boolean(),
});

const updateFavoriteSchema = joi.object({
  favorite: joi.boolean().required(),
})


router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.find({});
    res.json(result);
  } catch (error) {
    next(error);
  }
});


router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.findById(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const result = await contacts.create(req.body);
    if (!result) {
      res.status(201).json(result);
      return;
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const {contactId } = req.params;
    const result = await contacts.findByIdAndRemove(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      res.status(400).json({ message: error.message });
      return;
    }
    const { contactId } = req.params;
    const result = await contacts.findByIdAndUpdate(contactId, req.body, {new:true,});
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { error } = updateFavoriteSchema.validate(req.body);
    if (error) {
      throw createError(400, "missing field favorite");
    }
    const result = await contacts.findByIdAndUpdate(contactId, req.body, {new:true,});
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});


module.exports = router;
