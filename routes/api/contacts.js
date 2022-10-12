const express = require("express");
const Joi = require("joi");
const RequestError = require("../../helpers/RequestError");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const contactSchema = Joi.object().keys({
  name: Joi.string()
    .pattern(/^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$/)
    .required(),
  email: Joi.string()
    .pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)
    .required(),
  phone: Joi.string()
    .pattern(
      /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/
    )
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await getContactById(contactId);
    if (result === null)
      throw RequestError(404, `There are no contacts with id: ${contactId}`);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = contactSchema.validate(body);

    if (error) throw RequestError(400, error.details[0].message);

    const result = await addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await removeContact(contactId);

    if (result === null)
      throw RequestError(404, `There are no contacts with id: ${contactId}`);

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { body } = req;
    const { contactId } = req.params;
    const { error } = contactSchema.validate(body);

    if (error) throw RequestError(400, error.details[0].message);

    const result = await updateContact(contactId, body);
    if (result === null) return res.status(404).json({ message: "Not found" });
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
