const express = require("express");

const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().min(5).required().email(),
  phone: Joi.string().min(6).required(),
});

const contactsOperations = require("../../models/contacts");
const { RequestError } = require("../../utils");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
      message: "You got list of contacts!",
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw RequestError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "Got contact by id",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const result = await contactsOperations.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      // throw new NotFound(`Contact with id=${contactId} not found`);
      throw RequestError(404, `Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "Contact deleted!",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      throw RequestError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContactById(
      contactId,
      req.body
    );
    if (!result) {
      throw new NotFound(`Contact with id=${contactId} not found`);
    }
    res.status(201).json({
      status: "success",
      code: 200,
      data: {
        result,
      },
      message: "Contact is updated!",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
