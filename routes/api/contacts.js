const express = require("express");
const joi = require("joi");

const { HttpError } = require("../../helpers/index");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const contactSchema = joi.object({
  name: joi
    .string()
    .min(3)
    .max(20)
    .pattern(/^[A-Za-z\s]+$/, "numbers")
    .required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(/^\(\d{3}\)\s\d{3}-\d{4}$/, "numbers")
    .required(),
});

// Get all

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();

    res.status(200).json({
      status: "success",
      code: 200,
      message: "ok",
      data: data,
    });
  } catch (error) {
    next(error);
  }
});

// Get contact

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const response = await getContactById(id);
    if (!response) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "ok",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

// Create new contact

router.post("/", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing fields");
    }
    const body = req.body;

    const { error } = contactSchema.validate(body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const response = await addContact(body);

    if (response === "contact already exists") {
      throw HttpError(
        409,
        "Contact with such name, email or phone already exists"
      );
    }

    res.status(201).json({
      status: "success",
      code: 201,
      message: "New contact created",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

// Delete contact

router.delete("/:contactId", async (req, res, next) => {
  try {
    const response = await removeContact(req.params.contactId);
    if (!response) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact deleted",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

// Update contact

router.put("/:contactId", async (req, res, next) => {
  try {
    if (!Object.keys(req.body).length) {
      throw HttpError(400, "missing fields");
    }
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const response = await updateContact(req.params.contactId, req.body);

    if (!response) {
      throw HttpError(404, "Not found");
    }

    if (response === "contact already exists") {
      throw HttpError(
        409,
        "Contact with such name, email or phone already exists"
      );
    }

    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact updated",
      data: response,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
