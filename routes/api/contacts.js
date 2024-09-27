const express = require("express");
const router = express.Router();
const { AppError } = require("../../utils");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContactById,
} = require("../../models/contacts");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(20).required(),
  email: Joi.string().email(),
  phone: Joi.number().integer().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const contactList = await listContacts();
    res.status(200).json({
      msg: "Load Contact List!",
      contact: contactList,
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
      throw AppError(404, "Not found contact");
    }
    res.status(200).json({
      msg: "Success! Contact find",
      contact,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (!error) {
      throw AppError(400, error.message);
    }

    const newContact = await addContact(req.body);

    res.status(201).json({
      msg: "Contact created!",
      contact: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await removeContact(contactId, req.body);
    if (!result) {
      throw AppError(404, "Not found contact");
    }
    res.status(200).json({
      msg: "Success! Contact delete",
      contact: result,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw AppError(400, error.message);
    }
    const { contactId } = req.params;
    const updateContact = await updateContactById(contactId, req.body);

    if (!updateContact) {
      throw AppError(404, "Not found contact");
    }
    res.status(201).json({
      msg: "Contact update success!",
      contact: updateContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
