const express = require("express");
// express для маршрутизації
const router = express.Router();
// створюємо сторінку записної книжки
const { HttpError } = require("../../helpers");
const Joi = require("joi");
// для валідації при додавані до json
const addSchema = Joi.object({
  id: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required(),
})

const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not Found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try { const {error} = addSchema.validate(req.body);
  if(error){
    throw HttpError(404, error.message);
  }
  const result= await contacts.addContact(req.body);
  res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  try {
  } catch (error) {
    next(error);
  }
  res.json({ message: "template message" });
});

module.exports = router;
