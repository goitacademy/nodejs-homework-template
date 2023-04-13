const express = require("express");
const Joi = require("joi");

const router = express.Router();

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
})

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (err) {
   next(err);
    }
  });

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {err} = addSchema.validate(req.body);
    if (err) {
      throw HttpError(400, "Missing required name field");
    } 
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
})

router.delete('/:contactId', async (req, res, next) => {
try {
  const { id } = req.params;
  const result = await contacts.removeContact(id);
  if(!result) {
    throw HttpError(404, "Contact not found");
  }
  res.json({message: "Contact deleted"});
} catch (err) {
  next(err);
}  
});

router.put('/:contactId', async (req, res, next) => {
  try {
    const {err} = addSchema.validate(req.body);
    if (err) {
      throw HttpError(400, err.message);
    } 
    const {contactId} = req.params;
    const result = await contacts.updateContact(contactId, data);
    if (!result) {
      throw HttpError(404, "Contact not found");
  } 
  res.json(result);
 } catch (err) {
    next(err);
  }
  });

module.exports = router;
