const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");
const { HttpError } = require("../../helpers");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();

    res.status(200).json({
      result,
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({
      result,
    });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { name, email, phone } = req.body;
    const results = await addContact(name, email, phone);

    res.status(201).json({
      results,
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactMatch = await getContactById(contactId);

    if (contactMatch === undefined) {
      return res.status(404).json({
        message: "Not found",
      });
    }

    await removeContact(contactId);

    res.status(200).json({
      message: "contact deleted",
    });
  } catch (err) {
    console.log(err);

    res.status(404).json({
      message: "Not found",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    const { contactId } = req.params;

    const { error } = addSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await updateContact(contactId, body);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
