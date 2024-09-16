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

const validateSchemaPost = Joi.object({
  name: Joi.string().trim().min(2).max(30).required(),
  email: Joi.string().email({ tlds: true }).required(),
  phone: Joi.string().required(),
});

const validateSchemaPut = Joi.object({
  name: Joi.string().trim().min(2).max(30),
  email: Joi.string().email({ tlds: true }),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    const { query } = req;

    const contacts = await listContacts(query);
    res.json({
      status: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const getContactId = await getContactById(contactId);
  if (getContactId) {
    return res.status(200).json({ status: 200, data: getContactId });
  } else {
    return res.status(404).json({
      message: `There is no contact with id <${contactId}> in database`,
    });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = validateSchemaPost.validate(req.body);

    if (body.error?.message) {
      return res.status(400).json({ message: body.error.message });
    }
    const newContact = await addContact(req.body);
    return res.status(201).json({ data: { newContact } });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const isIdInDatabase = await removeContact(contactId);
  if (isIdInDatabase) {
    return res.status(200).json({ status: 200, message: "contact deleted" });
  } else {
    return res.status(404).json({
      message: `There is no contact with id ${contactId} in database`,
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = validateSchemaPut.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  if (!name && !email && !phone) {
    return res.status(400).json({ message: "missing fields" });
  }
  const updatedContact = await updateContact(contactId, req.body);
  if (updatedContact) {
    return res.status(200).json({ status: 200, data: updatedContact });
  } else {
    return res.status(404).json({
      status: 404,
      message: `There is no contact with id <${contactId}> in database`,
    });
  }
});

module.exports = router;
