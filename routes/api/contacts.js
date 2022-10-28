const express = require("express");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const Joi = require("joi");

const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  phone: Joi.string().min(10).max(14),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json({ message: data });
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await getContactById(contactId);
    res.status(200).json({ message: data });
  } catch (error) {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const validateBody = schema.validate(req.body);
    if (validateBody.error) {
      console.log(validateBody.error);
      res.status(400).json({ message: "missing required name field" });
    }
    const data = await addContact(validateBody.value);
    res.status(201).json({ message: data });
  } catch (error) {
    console.log(error.message);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await removeContact(contactId);
    if (data) {
      res.status(200).json({ message: "contact deleted" });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const validateBody = schema.validate(req.body);
    if (validateBody.error) {
      res.status(400).json({ message: "missing required name field" });
    }
    const { contactId } = req.params;
    const data = await updateContact(contactId, validateBody.value);
    if (data) {
      res.status(200).json({ message: data });
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error.message);
  }
});

module.exports = router;
