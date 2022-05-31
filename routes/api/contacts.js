const express = require("express");
const contacts = require("../../models/contacts");
const router = express.Router();
const Joi = require("joi");
const schema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  number: Joi.number().min(0.1).required(),
  email: Joi.string()
    .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
    .required(),
});

router.get("/", async (req, res, next) => {
  try {
    res.json(await contacts.listContacts());
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const product = await contacts.getContactById(contactId);
    !product
      ? res.status(404).json({ message: "Not found" })
      : res.json(product);
  } catch (e) {
    next(e);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing required name field" });
    }

    const all = await contacts.addContact(req.body);
    res.status(201).json(all);
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const prod = await contacts.removeContact(contactId);
  console.log(prod);
  if (!prod) {
    res.status(400).json({ message: "Not found" });
  } else {
    res.json({ message: "contact deleted" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = schema.validate(req.body);
    if (error) {
      res.status(400).json({ message: "missing fields" });
    }

    const { contactId } = req.params;
    const updatedProd = await contacts.updateContact(contactId, req.body);

    if (!updatedProd) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(updatedProd);
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
