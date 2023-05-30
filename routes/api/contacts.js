const express = require("express");

const Joi = require("joi");

const router = express.Router();

const contactsAPI = require("../../models/contacts");
const { HttpError, isRequestEmpty } = require("../../helpers");

const validationSchema = Joi.object({
  name: Joi.string().trim().required('Field "Name" should not be empty'),
  email: Joi.string().trim().email().required('Field "Email" should not be empty'),
  phone: Joi.string().trim().required('Field "Phone" should not be empty'),
});

const updateContactValidation = Joi.object({
  name: Joi.string().trim(),
  email: Joi.string().trim(),
  phone: Joi.string().trim(),
})

router.get("/", async (req, res, next) => {
  try {
    const results = await contactsAPI.listContacts();
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const results = await contactsAPI.getContactById(contactId);
    if (!results) {
      throw HttpError(404, `Contact with id: ${contactId} does not exist`);
    }
    res.json(results);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { body } = req;
  try {
    const { error } = validationSchema.validate(body);
    if (error) throw HttpError(400, error.message);

    const results = await contactsAPI.addContact(body);
    res.status(201).json(results);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const results = await contactsAPI.removeContact(contactId);
    if (results === null)
      throw HttpError(404, "No such contact, nothing to delete");
    res.status(200).json("Contact deleted");
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const { body } = req;

    if (isRequestEmpty(body)) throw HttpError(400, "Missing fields");
    
    const { error } = updateContactValidation.validate(body);
    if (error) throw HttpError(400, error.message);

    const results = await contactsAPI.updateContact(contactId, body);
    if (results === null)
      throw HttpError(404, "No such contact, nothing to update");
    res.json(results);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
