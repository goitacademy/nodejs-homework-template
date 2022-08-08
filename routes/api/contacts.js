const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const { NotFound } = require("http-errors");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string()
    .alphanum()
    .min(3)
    .pattern(/^\b([A-ZÀ-ÿ][-,a-z. ']+[ ]*)+$/)
    .trim()
    .required(),
  email: Joi.string().email().trim().required(),
  phone: Joi.string()
    .min(10)
    .pattern(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s./0-9]*$/, "numbers")
    .trim()
    .required(),
});

const router = express.Router();

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
    const { contactId } = req.params;
    const contact = await getContactById(contactId);
    if (!contact) {
      throw new NotFound("Not found");
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
      error.status = 400;
      throw error;
    }
    const newContact = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await removeContact(contactId, req.body);
    if (deletedContact) {
      res.status(200).json({
        status: "success",
        code: 200,
        message: "contact deleted",
      });
    } else {
      throw new NotFound("Not found");
    }
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
    const updatedContact = await updateContact(contactId, req.body);
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        updatedContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
