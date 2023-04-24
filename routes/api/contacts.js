const express = require("express");
const Joi = require("joi");
const contacs = require("../../models/contacts");
const { nanoid } = require("nanoid");
const { HttpError } = require("../../heplers");

const router = express.Router();

const addShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contacs.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const contactById = await contacs.getContactById(contactId);
    if (!contactById) throw HttpError(404, "Not Found");
    res.json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  try {
    const { error } = addShema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing required name field");
    }
    const contact = await contacs.addContact(newContact);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contacs.removeContact(contactId);
    if (!deleteContact) throw HttpError(404, "Not Found");
    res.status(200).json(deleteContact);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contacs.unpdateContact(contactId, req.body);

    if (!data) throw HttpError(400, "missing fields");
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
