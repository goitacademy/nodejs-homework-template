const express = require("express");

const Contact = require("../../models/contacts");

const { RequestError } = require("../../assistant");

const { authorize } = require("../../middlewares");

const Joi = require("joi");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const { _id: owner } = req.body;
    const result = await Contact.find({ owner }).populate("owner", "email");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", authorize, async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await Contact.findById(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", authorize, async (req, res, next) => {
  try {
    const { _id: owner } = req.user;
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "Missing required name field");
    }

    const result = await Contact.create({ ...req.body, owner });
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", authorize, async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const result = await Contact.findByIdAndDelete(id);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", authorize, async (req, res, next) => {
  try {
    const { error } = contactFavoriteSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing field favorite");
    }
    const id = req.params.contactId;
    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    if (!result) {
      throw RequestError(404, "not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", authorize, async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw RequestError(400, "missing fields");
    }
    const id = req.params.contactId;

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
