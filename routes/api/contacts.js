const express = require("express");
const Joi = require("joi");
const router = express.Router();

const contsctsServise = require("../../models/contacts");

const contactsAdds = Joi.object({
  name: Joi.string().messages({ "string.pattern.base": `Not valid name` }),
  email: Joi.string().messages({ "string.pattern.base": `Not valid email` }),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` }),
});

router.get("/", async (req, res, next) => {
  const resault = await contsctsServise.listContacts();
  res.json(resault);
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contsctsServise.getContactById(contactId);
    if (!result) {
      const error = new Error(`Not found"`);
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsAdds.validate(req.body);
    if (error) {
      const error = new Error(`missing required name field`);
      error.status = 404;
      throw error;
    }
    const result = await contsctsServise.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contsctsServise.removeContact(contactId);
    if (!result) {
      const error = new Error(`Not found"`);
      error.status = 404;
      throw error;
    }
    res.status(200).send({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contsctsServise.updateContacts(contactId, req.body);
    if (!result) {
      const error = new Error(`Not found"`);
      error.status = 404;
      throw error;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
