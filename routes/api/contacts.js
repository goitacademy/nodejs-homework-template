const express = require("express");
const Joi = require("joi");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const { HttpError, changeOutputMessage } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const data = await getContactById(req.params.contactId);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(30).required(),
  });

  try {
    const { error } = schema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const data = await addContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    error.message = changeOutputMessage(error.message);
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { name, phone, email } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string().min(3).max(30),
  }).or("name", "email", "phone");

  try {
    const { error } = schema.validate({ name, phone, email });
    if (error) {
      throw HttpError(400, error.message);
    }

    const newContact = Object.assign(
      {},
      name && { name },
      phone && { phone },
      email && { email }
    );

    const data = await updateContact(req.params.contactId, newContact);

    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(data);
  } catch (error) {
    error.message = changeOutputMessage(error.message);
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const data = await removeContact(req.params.contactId);
    if (!data) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
