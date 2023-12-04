const express = require("express");
const contacts = require("../../models/contacts");
const Joi = require("joi");
const { HttpError } = require("../../helpers");

const router = express.Router();

const checkShema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (result === null) {
      // first variant
      //return res.status(404).json({ message: "Not found" });
      // second variant
      // const error = new error("Not found");
      // error.status = 404;
      // third variant
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = checkShema.validate(body);
    // check body data first variant
    // if (body.name && body.email && body.phone) {

    // check body data second variant
    if (error) {
      throw HttpError(
        400,
        `missing required ${error.message
          .split(" ")
          .filter(
            (value) =>
              value !== "is" && value !== "required" && value !== "field"
          )} field`
      );
    }

    const result = await contacts.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contacts.removeContact(contactId);

    if (result === null) {
      throw HttpError(404, "Not found");
    }

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { body } = req;
    const { error } = checkShema.validate(body);

    if (error) {
      throw HttpError(
        400,
        `missing required ${error.message
          .split(" ")
          .filter(
            (value) =>
              value !== "is" && value !== "required" && value !== "field"
          )} field`
      );
    }

    const result = await contacts.updateContact(contactId, body);

    if (result === null) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json(result);
  } catch (error) {
    next();
  }
});

module.exports = router;
