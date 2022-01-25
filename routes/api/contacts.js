const express = require("express");
const Joi = require("joi");
const CreateError = require("http-errors");
const router = express.Router();

const contacts = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),

  email: Joi.string().email({
    tlds: { allow: ["com", "net"] },
  }),

  phone: Joi.string().min(10).max(10).messages({
    "string.max": `"phone" should be 10 characters`,
    "string.min": `"phone" should be 10 characters`,
  }),
})
  .with("name", "email")
  .with("email", "phone");

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    if (!result) {
      throw new CreateError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw new CreateError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = await schema.validateAsync(req.body).catch((error) => {
      const { details } = error;

      throw new CreateError(400, details[0].message);
    });

    const result = await contacts.addContact(body);
    if (!result) {
      throw new CreateError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw new CreateError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = await schema.validateAsync(req.body).catch((error) => {
      const { details } = error;

      throw new CreateError(400, details[0].message);
    });

    const result = await contacts.updateContact(contactId, body);
    if (!result) {
      throw new CreateError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
