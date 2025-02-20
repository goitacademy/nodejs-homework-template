const express = require("express");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const Joi = require("@hapi/joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  phone: Joi.string().min(7).max(15).required(),
});

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data: {
      contacts,
    },
  });
});

router.get("/:contactId", async (req, res, next) => {
  const contact = await getContactById(req.params.contactId);
  if (contact) {
    res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } else {
    res.status(404).json({
      status: "error",
      code: 404,
      message: "Not found",
    });
  }
});

router.post("/", async (req, res) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing required name field",
    });
  } else {
    const contact = await addContact(req.body);
    if (contact) {
      res.status(201).json({
        status: "success",
        code: 201,
        data: {
          contact,
        },
      });
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const deletedContact = await removeContact(req.params.contactId);
  if (deletedContact) {
    res.status(200).json({
      status: "success",
      code: 200,
      message: "contact deleted" });
  } else {
    res.status(404).json({ 
      status: "error",
      code: 404,
      message: "contact not found"
    });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({
      status: "error",
      code: 400,
      message: "missing fields",
    });
  } else {
    const contact = await updateContact(req.params.contactId, req.body);
    if (contact) {
      res.status(200).json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
    }
  }
});

module.exports = router;
