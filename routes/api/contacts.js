const express = require("express");
const createError = require("http-errors");
const router = express.Router();
const Joi = require("joi");
const contactsOperations = require("../../model/contacts");

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (_req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const contactById = await contactsOperations.getContactById(id);
    if (!contactById) {
      throw new createError(404, `Contact with id=${id} not found`);
      // const error = new Error(`Contact with id ${id} not found`);
      // error.status = 404;
      // throw error;
    }
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      console.log(error);
      throw new createError(400, { message: "Missing required name field" });
    }
    const newContact = await contactsOperations.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      console.log(error);
      throw new createError(400, { message: "Missing fields" });
    }
    const { id } = req.params;
    const result = await contactsOperations.updateContact(id, req.body);
    if (!result) {
      throw new createError(404, {
        message: `Contact with id=${id} not found`,
      });
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsOperations.removeContact(id);
    if (!result) {
      throw new createError(404, {
        message: `Contact with id=${id} not found`,
      });
    }
    res.status(200).json({ message: `Contact deleted` });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
