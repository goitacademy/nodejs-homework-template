const server = require("../../models/contacts").default;
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.get("/", async (req, res, next) => {
  try {
    const list = await server.listContacts();
    res.json(list);
  } catch (error) {
    next(error);
  }
});
router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await server.getContactById(contactId);
    if (!contact) {
      return res
        .status(400)
        .json({ message: `failure, no contact with id= ${contactId} found` });
    }
    res.json({ contact, message: "success" });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30).required(),

      phone: Joi.string().alphanum().min(10).max(12).required(),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ message: "missing required name field" });
    }
    const { name, email, phone } = req.body;
    await server.addContact(name, email, phone);
    res.json({ status: "success" });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await server.getContactById(contactId);
    await server.removeContact(contactId);
    if (!contact) {
      return res
        .status(400)
        .json({ message: `failure, no contact with id= ${contactId} found` });
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(30),

      phone: Joi.string().alphanum().min(10).max(12),

      email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      }),
    });
    const validationResult = schema.validate(req.body);
    if (validationResult.error) {
      return res.status(400).json({ status: validationResult.error });
    }
    const { contactId } = req.params;
    if (Object.keys(req.body).length === 0) {
      console.log("bye");
      return res.status(400).json({ message: "missing fields" });
    }
    const contact = await server.updateContact(contactId, req.body);
    console.log(req.body);

    res.json({ contact, message: "success" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
