const express = require("express");
const { response } = require("../../app");
const Joi = require("joi");
const contactsFunctions = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const listContacts = await contactsFunctions.listContacts();
    res.status(200).json(listContacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactsFunctions.getContactById(contactId);
    if (!contactById)
      return response.status(404).json({ message: "Not found" });
    res.status(200).json(contactById);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(10).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string()
      .pattern(/^[(]?[0-9][)]?()?[0-9]?[-]?[0-9]/)
      .required(),
  });

  const validatedData = schema.validate(req.body);

  if (validatedData.error)
    return res.status(400).json("Missing required name field");

  try {
    const newUserData = req.body;
    const newContact = contactsFunctions.addContact(newUserData);
    newContact
      ? res.status(201).json(newContact)
      : res.status(400).json("Contact with this email already exists");
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactById = await contactsFunctions.removeContact(contactId);
    contactById
      ? res.status(200).json("Contact deleted")
      : res.status(404).json("Not found");
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  const schema = Joi.object({
    name: Joi.string().alphanum().min(3).max(10),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().pattern(/^[(]?[0-9][)]?()?[0-9]?[-]?[0-9]/),
  });
  const validatedData = schema.validate(req.body);

  if (validatedData.error) return res.status(400).json("missing fields");
  try {
    await contactsFunctions.updateContact(contactId, req.body);
    const updateContact = await contactsFunctions.getContactById(contactId);
    res.status(200).json(updateContact);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
