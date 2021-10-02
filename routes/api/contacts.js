const express = require("express");
const router = express.Router();

const createError = require("http-errors");
const Joi = require("joi");

const Contacts = require("../../model/index");

const joiSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (_req, res, next) => {
  try {
    const contact = await Contacts.listContacts();
    return res.json({
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getById(req.params.contactId);
    if (contact) {
      return res.json({
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      throw new createError(404, "Not Found");
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      return res.json({
        code: 400,
        message: "missing required name field",
      });
    }
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      code: 201,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        code: 200,
        message: "contact deleted",
      });
    } else {
      throw new createError(404, "Not Found");
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
   try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        code: 400,
        message: "missing fields",
      });
    }
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        code: 200,
        message: "Contact updated successfully",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        code: 404,
        message: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
