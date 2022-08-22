const express = require("express");
const Joi = require("joi");
const createError = require("../../helpers/createError");
const {
  listContacts,
  addContact,
  removeContact,
  updateContact,
  getContactById,
} = require("../../models/contacts");

const router = express.Router();

const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await getContactById(id);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    console.log(req.body)
    if (error) {
      throw createError(400, error.message);
    }
    const result = await addContact(req.body);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const id = req.params.id;
    const result = await removeContact(id);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({message: "contact deleted" })
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);

    if (error) {
      throw createError(400, error.message);
    }
    const result = await updateContact(req.params.id, req.body);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
