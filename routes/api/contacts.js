/* eslint-disable semi */
/* eslint-disable quotes */
const express = require("express");
const router = express.Router();
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactsOperations = require("../../model");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      message: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.getContactById(contactId);
    if (!contact) {
      const error = new Error(`Contact whith id=${contactId} not found.`);
      error.status = 404;
      // or use package "http-errors"
      throw error;
    }
    res.json({
      message: "success",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const addContact = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: addContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contactsOperations.removeContact(contactId);
    if (!contact) {
      const error = new Error(`Contact whith id=${contactId} not found.`);
      error.status = 404;
      // or use package "http-errors"
      throw error;
    }
    res.json({
      message: "contact deleted",
      code: 200,
      data: contact,
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateContact = await contactsOperations.updateContactById(
      contactId,
      req.body
    );
    if (!updateContact) {
      const error = new Error(
        `Can not update contact, because id=${contactId} not found.`
      );
      error.status = 404;
      // or use package "http-errors"
      throw error;
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: updateContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
