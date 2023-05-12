const express = require("express");
const Joi = require("joi");
const router = express.Router();

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json(data || { message: "Contacts not found" });
});

router.get("/:contactId", async (req, res, next) => {
  const data = await getContactById(req.params.contactId);

  if (!data) {
    res.statusCode = 404;
  }

  res.json(data || { message: "Not found" });
});

router.post("/", async (req, res, next) => {
  const { name, phone, email } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(3).max(30).required(),
  });

  try {
    await schema.validateAsync({ name, phone, email });
  } catch (err) {
    res.statusCode = 400;
    if (!(name && phone && email)) {
      res.statusCode = 400;
      res.json({ message: "missing required name field" });
      return;
    }
    res.json({ message: err.message });
    return;
  }

  const data = await addContact(req.body);
  res.statusCode = 201;
  res.json(data || { message: "ooops. Something wrong" });
});

router.delete("/:contactId", async (req, res, next) => {
  const data = await removeContact(req.params.contactId);
  res.statusCode = data ? 200 : 404;
  const result = data
    ? { message: "contact deleted" }
    : { message: "Not found" };
  res.json(result);
});

router.put("/:contactId", async (req, res, next) => {
  const { name, phone, email } = req.body;

  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email(),
    phone: Joi.string().min(3).max(30),
  }).xor("name", "email", "phone");

  try {
    await schema.validateAsync({ name, phone, email });
  } catch (err) {
    res.statusCode = 400;
    if (!(name || phone || email)) {
      res.statusCode = 400;
      res.json({ message: "missing fields" });
      return;
    }
    res.json({ message: err.message });
    return;
  }

  const data = await updateContact(
    req.params.contactId,
    Object.assign({}, name && { name }, phone && { phone }, email && { email })
  );
  res.statusCode = data ? 200 : 404;
  res.json(data || { message: "Not found" });
});

module.exports = router;
