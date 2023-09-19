const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.number().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    let contacts = await listContacts();
    res.status(200).json({ contacts });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    let id = req.params.contactId;
    let contact = await getContactById(id);

    if (contact) {
      res.status(200).json({ contact });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const {error} = contactSchema.validate(req.body)
    let { name, email, phone } = req.body;
    if(error) {
      error.status = 400;
      throw error;
    }
    if (!name) {
      res.status(400).json({ message: "missing required Name field" });
    } else if (!email) {
      res.status(400).json({ message: "missing required Email field" });
    } else if (!phone) {
      res.status(400).json({ message: "missing required Phone field" });
    } else {
      let newContact = await addContact({ name, email, phone });
      res.status(201).json({ newContact });
    }
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    let id = req.params.contactId;
    let result = await removeContact(id);

    if (result) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const {error} = contactSchema.validate(req.body)
    if(error) {
      error.status = 400;
      throw error;
    }
    let { name, email, phone } = req.body;
    let id = req.params.contactId;

    if (!name || !email || !phone) {
      res.status(400).json({ message: "missing fields" });
    } else {
      let result = await updateContact(id, { name, email, phone });
      if (result) {
        res.status(200).json(result);
      } else {
        res.status(404).json({ message: "Not found" });
      }
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
