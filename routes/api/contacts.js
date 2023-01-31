const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();
const RequestError = require("../../errors/helpers/requestErors");
const Joi = require("joi");
// Joi для типізації данних що заходять з фронту, якщо якіхось полів не вистачає-викине помилку

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const schemaUpdate = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
}).min(1);
// .min(1) - що мінімально прийде хоча б одне поле на оновлення
// .or("name", "email", "phone") що мінімально прийде хоча б одне поле на оновлення

// ось приклад як робити контекстно-залежне шаблонування / форматування повідомлень,
// export const categorySchema = Joi.object({
//   mobile: Joi.string().trim().regex(/^[6-9]\d{9}$/).required().messages({
//       "string.base": `"" should be a type of string`,
//       "string.empty": `"" must contain value`,
//       "string.pattern.base": `"" must be 10 digit number`,
//       "any.required": `"" is a required field`
//   }),
//   password: Joi.string().trim().required().messages({
//       "string.base": `"" should be a type of 'text'`,
//       "string.pattern.base": `"" must be 10 digit number`,
//       "any.required": `"" is a required field`
//   }),
// }).required();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
    // next(error);метод експресу, перекидує на мідлвари в app.js
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    console.log(result, "result");
    if (!result) {
      console.log("get in");

      throw RequestError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    console.log("addSchema", error);

    if (error) {
      throw RequestError(400, "missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    console.log(req.params);
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.json({ message: "contact deleted" });
    // res.status(204).send(result);}
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schemaUpdate.validate(req.body);
    if (error) {
      throw RequestError(404, "Not found");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if (!result) {
      throw RequestError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
