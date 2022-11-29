const express = require("express");
const Joi = require("joi");

const {
  getContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { createError } = require("../../helpers");

const router = express.Router();

const addContactSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Z]+ [A-Z]+$/i)
    .min(3)
    .max(30)
    .required(),

  number: Joi.string()
    .length(10)
    .pattern(/^\d+$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` })
    .required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});

const editContactSchema = Joi.object({
  name: Joi.string()
    .regex(/^[A-Z]+ [A-Z]+$/i)
    .min(3)
    .max(30),

  number: Joi.string()
    .length(10)
    .pattern(/^\d+$/)
    .messages({ "string.pattern.base": `Phone number must have 10 digits.` }),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await getContacts();

    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await getContactById(contactId);

    if (!contactById) {
      throw createError({ status: 404, message: "Not found" });
    }

    res.json({
      status: "success",
      code: 200,
      data: contactById,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) throw createError({ status: 400, message: error.message });

    const newContact = await addContact(req.body);
    res.json({
      status: "success",
      code: 201,
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactDeleted = await removeContact(contactId);

    if (!contactDeleted) {
      throw createError({ status: 404, message: "Not Found" });
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: contactDeleted,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addContactSchema.validate(req.body);
    if (error) throw createError({ status: 400, message: error.message });

    const response = await updateContact(req.params, req.body);
    if (!response) {
      throw createError({ status: 404, message: "Not Found" });
    }

    res.json({
      status: "success",
      code: 200,
      message: "contact updated",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
