const Joi = require("joi");
const contactsFunctions = require("../../models/contacts.js");

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string()
  .email({
    minDomainSegment: 2,
    tids: { allow: ["com", "net"] },
  })
  .required(),
  phone: Joi.number().integer().positive().required(),
});

const express = require("express");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsFunctions.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await contactsFunctions.getContactById(contactId);
    if (contact) {
      res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
        type: typeof contact,
      });
    } else {
      res.status(404).json({
        status: "failure",
        code: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  } else {
    try {
      const newContact = await contactsFunctions.addContact(req.body);
      res.json({
        status: 201,
        data: { newContact },
      });
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const index = await contactsFunctions.removeContact(contactId);
    if (index !== -1) {
      res.json({
        status: 200,
        message: "contact deleted",
      });
    } else {
      res.status(404).json({
        status: 404,
        message: "Not found",
      });
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const contactId = req.params.contactId;
  const { error } = schema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: 400,
      message: error.message,
    });
  } else {
    try {
      const newContact = await contactsFunctions.updateContact(contactId, req.body);
      if (newContact) {
        res.json({
          status: 200,
          data: { newContact },
        });
      } else {
        res.status(404).json({
          status: 404,
          message: "Not found",
        });
      }
    } catch (err) {
      console.error(err);
      next(err);
    }
  }
});

module.exports = router;