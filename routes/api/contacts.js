const express = require("express");
const Joi = require("joi");

const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

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
    const {id} = req.params
    contactId = id
    const result = await contacts.getContactById(contactId);
    if(!result) {
      throw HttpError(404, `Contact with ${id} not found`)
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body)
    if(error){
      throw HttpError(400, error.message)
    }
    const result = await contacts.addContact();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contacts.removeContact(contactId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body)
    if(error){
      throw HttpError(404, `Contact with ${id} not found`)
    }
    const result = await contacts.updateContact(contactId);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
