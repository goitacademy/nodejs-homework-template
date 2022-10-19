const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { isValidObjectId } = require("mongoose");

const Contact = require("../../models/contacts");

const authenticate = require("../../middlewares/authenticate");

const { RequestError } = require("../../helpers");

const contactsAddSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsPatchSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

router.get("/", authenticate, async (req, res, next) => {
  try {
    const { page = 1, limit = 20, favorite = [true, false] } = req.query;

    const skip = (page - 1) * limit;

    const userId = req.user._id;
    const result = await Contact.find({ owner: userId, favorite }, "-__v", {
      skip,
      limit,
    });

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", authenticate, async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      throw RequestError(404, `${id} is not valid id`);
    }

    const result = await Contact.findById(id);

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", authenticate, async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);

    if (error) {
      throw RequestError(400, "missing required name field");
    }

    const userId = req.user._id;
    const newContact = {
      ...req.body,
      owner: userId,
    };

    const result = await Contact.create(newContact);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", authenticate, async (req, res, next) => {
  try {
    const id = req.params.contactId;

    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      throw RequestError(404, `${id} is not valid id`);
    }

    const result = await Contact.findByIdAndRemove(id);

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", authenticate, async (req, res, next) => {
  try {
    const { error } = contactsAddSchema.validate(req.body);

    if (error) {
      throw RequestError(400, "missing fields");
    }

    const id = req.params.contactId;

    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      throw RequestError(404, `${id} is not valid id`);
    }

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", authenticate, async (req, res, next) => {
  try {
    const { error } = contactsPatchSchema.validate(req.body);

    if (error) {
      throw RequestError(400, "missing field favorite");
    }

    const id = req.params.contactId;

    const isValidId = isValidObjectId(id);
    if (!isValidId) {
      throw RequestError(404, `${id} is not valid id`);
    }

    const result = await Contact.findByIdAndUpdate(id, req.body, { new: true });

    if (!result) {
      throw RequestError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
