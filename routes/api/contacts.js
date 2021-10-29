const express = require("express");
const { NotFound, BadRequest } = require("http-errors");
const Joi = require("joi");
const {
  listContacts,
  addContact,
  removeContact,
  updateContactById,
  getContactById,
} = require("../../model/contacts");

const joiSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
  phone: Joi.string()
    .length(10)
    .pattern(/^[0-9]+$/)
    .required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    if (!data) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const data = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await removeContact(contactId);
    if (!data) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.status(200).json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = joiSchema.validate(req.body);
    if (error) {
      throw new BadRequest(error.message);
    }
    const { contactId } = req.params;
    const data = await updateContactById(contactId, req.body);
    if (!data) {
      throw new NotFound(`Product with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        data,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
