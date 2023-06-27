const express = require("express");
const Joi = require("joi");

const contactsModel = require("../../models/contacts");

const router = express.Router();

const { httpError } = require("../../helpers");

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsModel.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const id = req.params.contactId;
    const contact = await contactsModel.getContactById(id);
    if (!contact) {
      throw httpError(404, "Contact not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // console.log(req.body);
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw httpError(400, error.message);
    }

    const result = await contactsModel.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  console.log("qweeeeeee");
  const contact = await contactsModel.removeContact(req.params.contactId);
  res.json(contact);
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const body = req.body;

  try {
    const { error } = addSchema.validate(body);
    if (error) {
      throw httpError(400, error.message);
    }

    const updatedContact = await contactsModel.updateContact(contactId, body);

    if (updatedContact) {
      res.json({
        message: "Contact updated successfully",
        contact: updatedContact,
      });
    } else {
      throw httpError(404, "Contact not found");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
