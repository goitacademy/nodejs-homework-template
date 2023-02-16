const express = require("express");

const router = express.Router();

const { NotFound, BadRequest } = require("http-errors");

const contactsOperations = require("../../models/contacts");

const Joi = require("joi");

const contactObjectSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

const contactObjectUpdateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string(),
  phone: Joi.string(),
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

    const contact = await contactsOperations.getContactById(contactId);
    console.log(contact);

    if (!contact) {
      throw new NotFound("Oops, file not found");
    }

    res.json({
      status: "success",
      code: 200,
      data: {
        result: contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactObjectSchema.validate(req.body);
    console.log(error);
    if (error) {
      throw new BadRequest("missing required name field");
    }
    const result = await contactsOperations.addContact(req.body);
    console.log(result);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
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
      throw new NotFound("Not found, can't delete");
    }
    res.status(200).json({
      code: 200,
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactObjectUpdateSchema.validate(req.body);
    if (error) {
      throw new BadRequest("valiation of at least 1 field is NOT succesful");
    }
    const { contactId } = req.params;

    const contactBodyUpdate = req.body;

    const result = await contactsOperations.updateContact(
      contactId,
      contactBodyUpdate
    );

    res.status(200).json({
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
