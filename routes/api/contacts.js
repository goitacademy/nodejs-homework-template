const express = require("express");

const router = express.Router();

const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const { HttpError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const listOfContacts = await listContacts();
    if (!listOfContacts) {
      throw HttpError(404);
    }
    res.json(listOfContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactByID = await getContactById(contactId);
    if (!contactByID) {
      throw HttpError(404);
    }
    res.json(contactByID);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = req.body;
    const { error } = schema.validate(data);
    if (error) {
      throw HttpError(400, error);
    }
    const contactToAdd = await addContact(data);
    res.status(201).json(contactToAdd);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const message = await removeContact(contactId);
    if (!message) {
      throw HttpError(404);
    }
    res.json({ message });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = req.body;
    if (!data) {
      throw HttpError(400, "missing fields");
    }
    const { error } = schema.validate(data);
    if (error) {
      throw HttpError(400, error);
    }
    const contact = await updateContact(contactId, data);
    if (!contact) {
      throw HttpError(404);
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
