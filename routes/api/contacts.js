const express = require("express");
const { PaginationParameters } = require("mongoose-paginate-v2");
const router = express.Router();

const functions = require("../../controller/contactController");
const { isAuthorized } = require("../../middleware/auth");
const contactModel = require("../../models/contact.model");
const {
  schemaContact,
  schemaFavorite,
} = require("../../validation/validation.js");

router.use(isAuthorized);

router.get("/", async (req, res) => {
  if (req.query.favorite) {
    const favoriteContacts = await functions.listFavoriteContacts();
    return res.send(favoriteContacts);
  }
  const { page, perPage } = req.query;
  if (!page) {
    page = 1;
  }
  if (!perPage) {
    perPage = 20;
  }
  const contacts = await functions.listContacts();
  return res.send(contacts);
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const contact = await functions.getContactById(id);
  if (!contact) {
    return res.status(400).json({ message: "Not found" });
  }
  res.send(contact);
});

router.post("/", async (req, res, next) => {
  const validationResult = schemaContact.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  }
  const contact = await functions.addContact(req.body);
  res.status(201).send(contact);
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await functions.removeContact(id);
  if (!result) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:id", async (req, res, next) => {
  const { id } = req.params;
  const validationResult = schemaContact.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({
      message: validationResult.error.details[0].message,
    });
  }
  const contact = await functions.updateContact(id, req.body);
  if (!contact) {
    return res.status(400).json({ message: "Not found" });
  }
  res.status(200).send(contact);
});

router.patch("/:id", async (req, res, next) => {
  const { id } = req.params;
  const validationResult = schemaFavorite.validate(req.body);
  if (validationResult.error) {
    return res.status(400).json({ message: "missing field favorite" });
  }
  const contact = await functions.updateStatusContact(id, req.body);
  res.status(200).send(contact);
});

module.exports = router;
