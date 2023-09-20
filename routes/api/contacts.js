const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactPutSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
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
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing required name field",
      });
    }
    const contact = await addContact(req.body);
    res.status(201).json({
      status: "success",
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
    const contact = await removeContact(req.params.contactId);
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactPutSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "error",
        code: 400,
        message: "missing fields",
      });
    }
    const contact = await updateContact(req.params.contactId, req.body);
    if (!contact) {
      return res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
