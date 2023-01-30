const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { NotFound } = require("http-errors");

const contactsOperations = require("../../models/contacts");
const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsOperations.listContacts();
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
    const resultId = await contactsOperations.getContactById(contactId);
    if (!resultId) {
      throw new NotFound("Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result: resultId,
      },
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

    const resultPost = await contactsOperations.addContact(req.body);
    res.status(201).json({
      status: "saccess",
      code: 201,
      data: {
        resultPost,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const resultDelete = await contactsOperations.removeContact(contactId);
    if (!resultDelete) {
      throw new NotFound(` not found `);
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: {
        resultDelete,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const resultPut = await contactsOperations.updateContact(contactId,req.body);
    if (!resultPut) {
      throw new NotFound("missing fields");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        resultPut,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
