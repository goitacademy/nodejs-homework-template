const express = require("express");

const router = express.Router();

const Joi = require("joi");

const { createError } = require("../../helpers/createError");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  NOT_CONTACT_FOR_DELETING,
  NOT_CONTACT_FOR_UPDATING,
  CONTACT_NOT_FOUND,
  CONTACT_DELETED,
  CONTACT_ADDED,
  CONTACT_ALLREADY_EXIST,
  CONTACT_UPDATED,
} = require("./contactsConstants");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await listContacts();

    if (!data) {
      throw createError({ status: 404 });
    }

    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await getContactById(contactId);

    if (!result) {
      throw createError({ status: 404, message: CONTACT_NOT_FOUND });
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw createError({ status: 404, message: error.message });
    }

    const result = await addContact(req.body);

    if (result === "exist") {
      throw createError({ status: 400, message: CONTACT_ALLREADY_EXIST });
    }
    res.status(201).json({
      data: result,
      message: CONTACT_ADDED,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await removeContact(contactId);

    if (!result) {
      throw createError({ status: 400, message: NOT_CONTACT_FOR_DELETING });
    }

    res.json({ id: result, message: CONTACT_DELETED });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const {
      params: { contactId },
      body,
    } = req;

    const { error } = contactSchema.validate(req.body);

    if (error) {
      throw createError({ status: 404, message: error.message });
    }

    if (error) {
      throw createError({ status: 400 });
    }
    
    const updatedContact = await updateContact(contactId, body);

    if (!updatedContact) {
      throw createError({ status: 400, message: NOT_CONTACT_FOR_UPDATING });
    }

    res.status(201).json({
      updatedContact: updatedContact,
      message: CONTACT_UPDATED,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
