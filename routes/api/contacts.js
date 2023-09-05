const express = require("express");
const router = express.Router();
const Joi = require("joi");

const postContactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean().required(),
});

const putContactSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
  favorite: Joi.boolean(),
});

const patchContactSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contacts.listContacts();
    res.status(200).json({
      message: "success",
      data: { contactsList },
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await contacts.getContactById(contactId);

    if (contact) {
      res.status(200).json({
        message: "success",
        data: { contact },
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const body = req.body;
    const { error } = postContactSchema.validate(body);

    if (error) return res.status(400).json({ message: "missing required name field" });

    const newContactsList = await contacts.addContact(body);
    res.status(201).json({
      message: "success contact added",
      data: { newContactsList },
    });
  } catch (error) {
    res.status(500).json(`Contact create error`);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await contacts.removeContact(contactId);

    if (deletedContact) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "not found" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    const { error } = putContactSchema.validate(body);
    if (error) {
      res.status(400).json({
        message: "missing fields",
        error: error.details[0].message,
      });
      return;
    }

    const contactEdit = await contacts.updateContact(contactId, body);

    if (contactEdit) {
      res.status(200).json({
        message: "success",
        data: { contactEdit },
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    const { contactId } = req.params;
    const { error } = patchContactSchema.validate(body);

    if (error)
      return res
        .status(400)
        .json({ message: "Too much fields or missing field favorite" });


    const contactFavorite = await contacts.updateStatusContact(contactId, body);

    if (contactFavorite) {
      res.status(200).json({
        message: "success",
        data: contactFavorite,
      });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    res.status(500).json({
      message: "error",
      error: error.message,
    });
  }
});

module.exports = router;
