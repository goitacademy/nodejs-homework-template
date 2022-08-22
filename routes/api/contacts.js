const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const Joi = require("joi");

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);
  if (data.length) {
    return res.json(data);
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().min(10).max(22).required(),
  });

  const validateBody = schema.validate(req.body);
  if (validateBody.error) {
    return res
      .status(400)
      .json({ message: `missing required ${validateBody.error} field` });
  } else {
    const data = await addContact(validateBody.value);
    return res.status(201).json(data);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const dataId = await removeContact(req.params.contactId);
  if (dataId) {
    return res.status(200).json({ message: "contact deleted" });
  } else {
    return res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().alphanum().min(1).max(20).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().min(10).max(22).required(),
  });

  const validateBody = schema.validate(req.body);
  if (validateBody.error) {
    return res.status(400).json({ message: "missing fields" });
  }
  const dataContacts = await updateContact(
    req.params.contactId,
    validateBody.value
  );
  if (!dataContacts.length) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json(dataContacts);
});

module.exports = router;
