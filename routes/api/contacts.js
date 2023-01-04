const express = require("express");
const models = require("../../models/contacts");
const { HttpError } = require("../../models/helpers");
const { putContactSchema, postContactSchema } = require("../../models/schemas");
const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await models.listContacts();
  if (!contacts) {
    return next(new HttpError(404, "Something wrong"));
  }
  res.json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await models.getContactById(contactId);
  if (!contact) {
    return next(new HttpError(404, "Contact not found"));
  }
  return res.json(contact);
});

router.post("/", async (req, res, next) => {
  const { error } = postContactSchema.validate(req.body);
  if (error) {
    return next(
      new HttpError(400, "Missing required name field or filled incorectly")
    );
  }
  const { name, email, phone } = req.body;
  const newContact = await models.addContact(name, email, phone);
  res.status(201).json(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new HttpError(400, "Not found"));
  }
  await models.removeContact(id);

  res.status(200).json({ message: "contact deleted" });
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = putContactSchema.validate(req.body);
  if (error) {
    return next(new HttpError(400, "Missing fields or filled incorrectly"));
  }
  const { id } = req.params;
  const { name, email, phone } = req.body;
  const updatedContact = await models.updateContact(id, {
    name,
    email,
    phone,
  });
  return res.status(200).json(updatedContact);
});

module.exports = router;
