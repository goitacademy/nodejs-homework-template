const express = require("express");
const router = express.Router();
const Joi = require("joi");
const { NotFound, BadRequest } = require("http-errors");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const contactTemplate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    if (!contacts) {
      throw new NotFound(`Not found`);
    }
    res.json({
      contacts,
    });
  } catch (error) {
    next(error);
  }
});
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw new NotFound(`User with id ${contactId} was not found`);
    }
    res.json({
      result,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = contactTemplate.validate(body);
    if (error) {
      throw new BadRequest(` ${error} field`);
    } else {
      const newContact = await addContact(body);
      res.status(201).json(newContact);
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await removeContact(contactId);

    if (!result) {
      res.status(404).json(`User with id ${contactId} was not found`);
    }
    res
      .status(204)
      .json({ message: `User with id ${contactId} has been deleted` });
  } catch (error) {
    res.json({ error: error.massage });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    const { error } = contactTemplate.validate(body);
    if (error) {
      throw new BadRequest(` ${error} field`);
    } else {
      const result = await updateContact(contactId, body);
      if (!result) {
        throw new NotFound(`User with id ${contactId} was not found`);
      }
      res.status(201).json(result);
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
