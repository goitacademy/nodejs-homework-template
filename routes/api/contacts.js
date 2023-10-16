const express = require("express");
const addSchema = require("../../schemas/contacts.js");
const HttpError = require("../../helpers/HttpError.js");

const contactsHandler = require("../../models/contacts.js");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsHandler.listContacts();
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsHandler.getContactById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }
    const result = await contactsHandler.addContact(req.body);
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsHandler.removeContact(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.status(200).json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }
    const { id } = req.params;
    const result = await contactsHandler.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    return res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
