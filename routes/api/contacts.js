const express = require("express");
const Joi = require("joi");
const router = express.Router();
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers/index");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
    .required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await contacts.getContactById(id);
    if (!data) {
      throw HttpError(404, "Not found!");
    }
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const missingFields = error.details
        .map((detail) => detail.path[0])
        .join(", ");
      throw HttpError(400, `Missing required field(s): ${missingFields}`);
    }

    const data = await contacts.addContact(req.body);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const data = await contacts.removeContact(id);
    if (!data) {
      throw HttpError(404, "Not found!");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields");
    }

    const { error } = schema.validate(req.body);
    if (error) {
      const missingFields = error.details
        .map((detail) => detail.path[0])
        .join(", ");
      throw HttpError(400, `Missing required field(s): ${missingFields}`);
    }

    const id = req.params.contactId;
    const data = await contacts.updateContact(id, req.body);
    if (!data) {
      throw HttpError(404, "Not found");
    }

    res.json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
