const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json(await listContacts());
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await getContactById(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.json(result);
  }
});

router.post("/", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().required(),
    phone: [Joi.string(), Joi.number()],
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    res
      .status(400)
      .json({ message: validationResult.error.details[0].message });
  } else {
    res.status(201).json(await addContact(req.body));
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const result = await removeContact(contactId);
  if (!result) {
    res.status(404).json({ message: "Not found" });
  } else {
    res.status(200).json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  if (req.body.constructor === Object && Object.keys(req.body).length === 0) {
    res.status(400).json({ message: "missing fields" });
  } else {
    res.json(await updateContact(contactId, req.body));
  }
});

module.exports = router;
