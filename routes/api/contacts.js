const express = require("express");

const Joi = require("joi");
const myCustomJoi = Joi.extend(require("joi-phone-number"));

const contactScheme = Joi.object({
  name: Joi.string().alphanum().min(3).max(30).required(),
  phone: myCustomJoi.string().required().phoneNumber(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
});
const router = express.Router();

const {
  listContacts,
  getContactById,
  // removeContact,
  addContact,
  // updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      const error = new Error(`Contact with id: ${contactId} is not found`);
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactScheme.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const contact = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
