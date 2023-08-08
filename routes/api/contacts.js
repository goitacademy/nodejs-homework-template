const express = require("express");
const contact = require("../../controllers/contacts");

const router = express.Router();

const HttpError = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const result = await contact.listContacts();
    if (!result) throw HttpError(404, "Not found");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await contact.getContactById(req.params.contactId);
    if (!result) throw HttpError(404, "Not found");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const result = await contact.addContact(req.body);
  if (!result) {
    throw HttpError(400, "missing required name field");
  }
  res.status(201).json(result);
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await contact.removeContact(req.params.contactId);
    if (!result) throw HttpError(404, "Not found");
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const result = await contact.updateContact(req.params.contactId, req.body);
    if (!result) throw HttpError(404, "Not found");
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId/favorite", async (req, res, next) => {
  const result = await contact.updateContact(req.params.contactId, req.body);
  if (!result) throw HttpError(404, "Not found");
  res.status(200).json(result);
});

module.exports = router;
