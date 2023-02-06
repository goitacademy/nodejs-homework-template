const express = require("express");
const Joi = require("joi");
const cm = require("../../models/contacts");

const {
  HttpError,
} = require("../errors/HttpErrors");

const postContactSchema = Joi.object()
  .keys({
    name: Joi.string().required(),
    email: Joi.string().email({ multiple: true }),
    phone: Joi.string(),
  })
  .or("email", "phone")
  .messages({
    "object.missing":
      "One of [email] or [phone] values should be not null",
  });

const putContactSchema = Joi.object()
  .keys({
    name: Joi.string(),
    email: Joi.string().email({ multiple: true }),
    phone: Joi.string(),
  })
  .or("name", "email", "phone")
  .messages({
    "object.missing":
      "One of [name], [email] or [phone] values should be not null",
  });

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await cm.listContacts();
    res.json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:contactId",
  async (req, res, next) => {
    try {
      const contact = await cm.getContactById(
        req.params.contactId
      );
      if (!contact) {
        throw HttpError(
          404,
          `Contact with id ${req.params.contactId} was not found`
        );
      }
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req, res, next) => {
  try {
    const { error } = postContactSchema.validate(
      req.body
    );
    if (error) {
      throw HttpError(400, error.message); // Joi validation error
    }
    const contact = await cm.addContact(req.body);
    res.status(201).json(contact);
  } catch (error) {
    next(error);
  }
});

router.delete(
  "/:contactId",
  async (req, res, next) => {
    try {
      const contact = await cm.removeContact(
        req.params.contactId
      );
      if (!contact)
        throw HttpError(
          404,
          `Contact with id ${req.params.contactId} was not found`
        );
      res.json({
        message:
          "Contact was successfully deleted",
      });
    } catch (error) {
      next(error);
    }
  }
);

router.put(
  "/:contactId",
  async (req, res, next) => {
    try {
      const { value, error } =
        putContactSchema.validate(req.body);
      if (error) {
        throw HttpError(400, error.message); // Joi validation error
      }
      const id = req.params.contactId;
      const contact = await cm.updateContact(
        id,
        req.body
      );
      if (!contact)
        throw HttpError(
          404,
          `Contact with id ${id} was not found`
        );
      res.json(contact);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
