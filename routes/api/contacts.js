const express = require("express");
const router = express.Router();
const Joi = require("joi");
const contactsOperations = require("../../models/contacts");

const joiShema = Joi.object({
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
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id ${contactId} not found`,
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

router.post("/", async (req, res, next) => {
  const { error } = joiShema.validate(req.body);
  if (error) {
    res.json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
  }
  try {
    const result = await contactsOperations.addContact(req.body);
    res.json({
      status: "success",
      code: 201,
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id ${contactId} not found`,
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      message: "product deleted",
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = joiShema.validate(req.body);
  if (error) {
    res.json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
  }
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);

    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id ${contactId} not found`,
      });
      return;
    }

    res.json({
      status: "success",
      code: 200,
      data: { result },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      code: 500,
      message: "Server error",
    });
  }
});

module.exports = router;
