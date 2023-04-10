const express = require("express");
const Joi = require("joi");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const schema = Joi.object({
  name: Joi.string().required(),
  phone: Joi.string().required(),
  email: Joi.string().required(),
});

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);
    if (!contact) return res.status(404).json({ message: "Contact not found" });
    res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    const [errorLable] = validationDataReq.error.details;
    if (error)
      res.status(400).json({
        message: `missing required ${errorLable.context.label} field`,
      });

    const contact = await addContact(req.body);
    res.status(201).json(contact);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);
    if (!contact) return res.status(404).json({ message: "Not found" });

    return res.status(200).json({ message: "contact deleted" });
  } catch (err) {
    next(err);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ message: "missing fields" });
  try {
    const contact = await updateContact(req.params.contactId, req.body);
    if (!contact) return res.status(404).json({ message: "Not found" });
    return res.status(200).json(contact);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
