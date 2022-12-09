const express = require("express");
// const createError = require("http-errors");
const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().min(2).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net", "org", "co.uk", "com.ua"] },
    })
    .required(),
  phone: Joi.string().min(5).max(20).required(),
});
const contactsOperations = require("../../models/contacts");

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
    });
  } catch (error) {
    next(error);
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "Server error",
    // });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.getContactById(contactId);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
      // throw createError(404, `Priduct with id=${id} not found`);
      // const error = new Error(`Product with id=${id} not found`);
      // error.status = 404;
      // throw error;
      // res.status(404).json({
      //   status: "error",
      //   code: 404,
      //   message: `Product with id=${id} not found`,
      // });
      // return;
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
    // res.status(500).json({
    //   status: "error",
    //   code: 500,
    //   message: "Server error",
    // });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }

    const addedContact = await contactsOperations.addContact(req.body);
    // console.log("aaaaaa", req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      addedContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.status(204).json({
      status: "success",
      code: 200,
      message: "product deleted",
      data: {
        result,
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
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      throw new NotFound(`Product with id=${contactId} not found`);
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

module.exports = router;
