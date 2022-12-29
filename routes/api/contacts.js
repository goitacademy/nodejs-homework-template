const express = require("express");
const router = express.Router();

const contactsOperations = require("../../models/contacts");
const { validation } = require("../../middlewares");
const { contactSchema } = require("../../shema");

router.get("/", async (req, res, next) => {
  const contacts = await contactsOperations.listContacts();
  res.json({ contacts });
});

router.get("/:contactId", async (req, res, next) => {
  const result = await contactsOperations.getContactById(req.params.contactId);
  if (!result) {
    res.status(404).json({
      message: `Product with id=${contactId} not found`,
    });
    return result;
  }
  res.status(200).json({ result });
});

router.post("/", validation(contactSchema), async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const result = await contactsOperations.addContact(req.body, res);
    res.status(201).json({ result });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsOperations.removeContact(contactId);
    if (!result) {
      res.status(404).json({
        message: `Product with id=${contactId} not found`,
      });
    }
    res.status(200).json({ result, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validation(contactSchema), async (req, res, next) => {
  try {
    const { error } = contactSchema.validate(req.body);
    if (error) {
      error.status = 400;
      throw error;
    }
    const { contactId } = req.params;
    const result = await contactsOperations.updateContact(contactId, req.body);
    if (!result) {
      res.status(404).json({
        message: `Product with id=${contactId} not found`,
      });
    }
    res.json({ result, message: "put contact" });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
