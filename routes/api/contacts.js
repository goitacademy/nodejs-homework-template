const express = require("express");

const Joi = require("joi");

const contactsService = require("../../models/contacts.js");

const { HttpError } = require("../../helpers");

const router = express.Router();

const movieAddSchema = Joi.object({
  title: Joi.string().required().messages({
    "any.required": `"title" must be exist`,
  }),
  director: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const contact = await contactsService.getContactById(req.params.id);

    if (!result) {
      throw HttpError(404, `Contact with id=${id} not found`);
    }

    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  //res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsService.removeContact(id);
    if (!result) {
      throw HttpError(404, `Movie with id=${id} not found`);
    }
    res.json({
      message: "Delete success",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  //res.json({ message: "template message" });
});

module.exports = router;
