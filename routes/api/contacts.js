const express = require("express");
const Joi = require("joi");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const router = express.Router();

const validateContact = (data) => {
  const phonePattern = /^\(\d{3}\) \d{3}-\d{4}$/;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().pattern(phonePattern),
  });
  return schema.validate(data);
};

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not Found!");
    }
    res.json({
      status: "success",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
      throw HttpError(400, "missing required name field");
    }

    const { error } = validateContact({ name, email, phone });

    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    if (name && email && phone) {
      const result = await contacts.addContact({ name, email, phone });
      res.json({
        status: "success",
        code: 201,
        data: result,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw HttpError(404, "Not Found!");
    }
    res.json({
      status: "contact deleted",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    const { error } = validateContact(body);

    if (error) {
      throw HttpError(400, error.details[0].message);
    }

    if (!body) {
      throw HttpError(400, "missing required name field");
    }
    const check = await contacts.getContactById(contactId);
    if (!check) {
      throw HttpError(404, "Not Found!");
    }
    const result = await contacts.updateContact(contactId, body);
    res.json({
      status: "contact updated",
      code: 200,
      data: result,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
