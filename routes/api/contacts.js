// const { json } = require("express");
const express = require("express");
const Joi = require("joi");

const router = express.Router();
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const list = await listContacts();
    res.status(200);
    res.json({ contacts: JSON.parse(`${list}`) });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const searchId = req.params.contactId;
    const searchContact = await getContactById(searchId);
    if (!searchContact) {
      throw new Error(`Not found`);
    }
    res.status(200);
    res.json({ contact: searchContact });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const schema = Joi.object({
    name: Joi.string().alphanum().min(2).max(30).required(),
    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
    phone: Joi.string().alphanum().min(5).max(12).required(),
  });

  try {
    const body = await schema.validateAsync({
      name,
      email,
      phone,
    });
    const newContact = await addContact(body);
    res.status(201);
    res.json({ contact: newContact });
  } catch (err) {
    res.status(400).json("missing required name field");
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const searchId = req.params.contactId;
    const contactList = await removeContact(searchId);
    if (contactList === null) {
      throw new Error(`Not found`);
    }
    res.status(200);
    res.json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
