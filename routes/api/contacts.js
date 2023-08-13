const express = require("express");
const Joi = require("joi");
const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

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
    // res.status(500).json({ message: 'Server error'});
    // 2
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      // 1
      throw HttpError(404, "Not found");
      // 2
      // const error = new Error('Not found');
      // error.status = 404;
      // throw error;
      // 3
      // return res.status(404).json({ message: 'Not found'});
    }
    res.json(result);
  } catch (error) {
    // 1
    // const {status = 500, message = 'Server error'} = error;
    // res.status(status).json({ message,});
    // 2
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      // throw HttpError(400, error.message);
      throw HttpError(400, "missing required name field");
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch(error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json({massage: "contact deleted"})
    // res.json(result);
  }
catch(error) {
  next(error);
}
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const {error} = addSchema.validate(req.body);
    if(error) {
      throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await contacts.updateContact(contactId, req.body);
    if(!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  }
catch(error){
  next(error);
}
});

module.exports = router;
