const express = require("express");

const router = express.Router();
const contactsModule = require("../../models/contacts");
const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().trim().required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsModule.listContacts();
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
    const result = await contactsModule.getContactById(contactId);
    if (result === null) {
      res.status(404).json({ code: 404, message: "Not found" });
    }
    res.json({
      status: "success",
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
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsModule.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsModule.removeContact(contactId);
    if (!result) {
      res.status(404).json({ status: "404", message: "Not found" });
    }
    res.status(200).json({ status: "success", message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const updateContactById = await contactsModule.updateContact(
      contactId,
      req.body
    );
    console.log(updateContactById);
    if (updateContactById) {
      res.status(200).json({ status: "success", message: "contact update" });
    }
    res.status(404).json({ status: "404", message: "Not found" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
