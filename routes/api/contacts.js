const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");
const contactsSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result: data,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id ${contactId} not found`,
      });
      return;
    }
    res.status(200).json({
      status: "succuess",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contacts was created",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deleteContact = await contacts.removeContact(contactId);
    if (!deleteContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: `Contact with id ${contactId} not found`,
      });
    }
    res.status(200).json({
      status: "succsess",
      code: 200,
      message: "Contact was deleted",
      data: {
        deleteContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactsSchema.validate(req.body);
    if (error) {
      error.status(400);
    }
    if (!req.body) {
      res.status(400).json({
        status: "error",
        code: 400,
        message: "Missing fields",
      });
    }
    const { contactId } = req.params;
    const updateContactById = await contacts.updateContact(contactId, req.body);
    if (!updateContactById) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
    res.status(201).json({
      status: "success",
      code: 201,
      message: "Contact was updated",
      data: {
        updateContactById,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;