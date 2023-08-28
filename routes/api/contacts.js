import { addSchema } from "../../schemas/schemas";

const express = require("express");

const contacts = require("../../models/contacts");

const { HttpError } = require("../../helpers");

const router = express.Router();



router.get("/", async (req, res, next) => {
 
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
try {
  
  const { contactId } = req.params;
  const result = await contacts.removeContact(contactId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({ message: "contact deleted" });
} catch (err) {
  next(err);
}});

router.put("/:contactId", async (req, res, next) => {
  try {
    
    if (Object.keys(req.body).length === 0) {
      throw HttpError(400, "missing fields" );
    }
    const { error } = addSchema.validate(req.body);

    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contacts.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (err) {
        next(err);

  }
});

module.exports = router;
