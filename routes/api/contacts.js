const express = require("express");

const router = express.Router();
const contacts = require("../../models/contacts");
const Joi = require("joi");
const AppError = require("../../helpers/AppError");
const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const allContacts =
      await contacts.listContacts();
    if (!allContacts) {
      throw AppError(404, "Not found");
    }
    res.status(200).json({
      message: "template message",
      contacts: allContacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get(
  "/:contactId",
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const contactById =
        await contacts.getContactById(contactId);
      if (!contactById) {
        throw AppError(404, "Not found");
      }
      res.status(200).json({
        message: "Contact got by id",
        contactById: contactById,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(
      req.body
    );
    if (error) {
      throw AppError(404, error.message);
    }
    const result = await contacts.addContact(
      req.body
    );
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  res.json({ message: "template message" });
});

router.delete(
  "/:contactId",
  async (req, res, next) => {
    try {
      const { contactId } = req.params;
      const result = await contacts.removeContact(
        contactId
      );
      if (!result) {
        throw new AppError(404, "Not Found");
      }
      res.status(200).json({
        message: "Delete success",
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
      const { error } = addSchema.validate(
        req.body
      );
      if (error) {
        throw AppError(404, error.message);
      }
      const { contactId } = req.params;
      const result = await contacts.updateContact(
        contactId,
        req.body
      );
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
