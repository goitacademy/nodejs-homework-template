const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
});

router.param("contactId", async (_, res, next, val) => {
  try {
    const contacts = await listContacts();
    if (!contacts.find((contact) => contact.id === val)) {
      return res.status(404).json({
        status: "fail",
        message: "Not found",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/", async (_, res, __) => {
  try {
    const contacts = await listContacts();
    res.status(200).json({
      status: "success",
      code: res.statusCode,
      data: { contacts },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.get("/:contactId", async (req, res, _) => {
  try {
    const contact = await getContactById(req.params.contactId);
    res.status(200).json({
      status: "success",
      code: res.statusCode,
      data: { contact },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.post("/", async (req, res, _) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }
    const newContact = await addContact(req.body);
    res.status(201).json({
      status: "success",
      code: res.statusCode,
      data: { contact: newContact },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.delete("/:contactId", async (req, res, _) => {
  try {
    await removeContact(req.params.contactId);
    res.status(200).json({
      status: "success",
      message: "contact deleted",
      data: null,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

router.put("/:contactId", async (req, res, _) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "fail",
        message: "missing fields",
      });
    }

    const { error } = updateSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        status: "fail",
        message: error.details[0].message,
      });
    }

    const updatedContact = await updateContact(req.params.contactId, req.body);
    res.status(200).json({
      status: "success",
      data: { contact: updatedContact },
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ error });
  }
});

module.exports = router;
