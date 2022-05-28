const express = require("express");
const Joi = require("joi");
const Schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const {
  listContacts,
  getContactById,
  addContact,
  updateContact,
  removeContact,
} = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json(contacts);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    if (!contact) {
      return res.json(404, { message: "Not found" });
    }
    await res.json(contact);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { error } = await Schema.validate(req.body);

  try {
    if (error) {
      return res.json(400, { message: "missing required name field" });
    }

    const contact = await addContact(req.body);
    await res.json(201, contact);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const deletedContact = await removeContact(contactId);
    if (!deletedContact) {
      return res.json(404, { message: "Not found" });
    }
    res.json(200, { message: "contact deleted" });
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const body = req.body;
  if (!body) {
    return res.json(400, { message: "missing fields" });
  }
  const { contactId } = req.params;
  const { error } = await Schema.validate(body);
  if (error) {
    return res.json(400, { message: "missing required name field" });
  }
  try {
    const contact = await updateContact(contactId, body);
    if (!contact) {
      return res.json(400, { message: "Not found" });
    }
    res.json(200, contact);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
