const express = require("express");
const Joi = require("joi");
const contactsJs = require("../../models/index.js");
const { HttpError } = require("../../helpers");
const router = express.Router();

module.exports = router;

// обьект настроке валидации (схемы)
const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsJs.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    // req.params - дает наш id
    const { id } = req.params;
    const result = await contactsJs.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    // если передать в некст error он пойдет искать фунциию с 4ма агрументами
    // app.use((err, req, res, next)
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // валидация формы (схема)
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    //запрос
    const result = await contactsJs.addContact(req.body);
    //ответ
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsJs.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsJs.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});
