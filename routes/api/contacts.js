const express = require("express");
const {
  HttpError,
  dataValidator,
  updatedDataValidator,
} = require("../../helpers");
// const {dataValidator, updatedDataValidator} = require("../../helpers/dataValidator");

const contacts = require("../../models/contacts");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = dataValidator(body);

    if (error) {
      const message = `missing required ${error.details[0].context.label} field`;
      throw HttpError(400, message);
    }

    const result = await contacts.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params
    const result = await contacts.removeContact(contactId)
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json({"message": "contact deleted"})
  } catch (error) {
    next(error)
  }
 
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = updatedDataValidator(req.body);
    
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params
    const result = await contacts.updateContact(contactId, req.body)
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
});

module.exports = router;
