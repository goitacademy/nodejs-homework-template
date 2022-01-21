const express = require("express");
const router = express.Router();
const createError = require("http-errors");
const Joi = require("joi");

const contactsToDo = require("../../model/index");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.number().required(),
  email: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsToDo.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsToDo.getContactById(id);
    if (!result) {
      // eslint-disable-next-line new-cap
      throw new createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      // eslint-disable-next-line new-cap
      throw new createError(400, "Not found");
    }
    const { name, phone, email } = req.body;
    const result = await contactsToDo.addContact(name, phone, email);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  console.log(req.body);
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      // eslint-disable-next-line new-cap
      throw new createError(400, "missing fields");
    }
    const { id } = req.params;
    const { name, phone, email } = req.body;
    const result = await contactsToDo.updateContact(id, name, phone, email);
    if (!result) {
      // eslint-disable-next-line new-cap
      throw new createError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsToDo.removeContact(id);
    if (!result) {
      // eslint-disable-next-line new-cap
      throw new createError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
    // res.json(result)
  } catch (error) {
    next(error);
  }
});

module.exports = router;
