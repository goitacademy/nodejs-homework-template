const express = require("express");
const { addContactSchema, updateContactSchema } = require("./schema");
const ctrl = require("../../model");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await ctrl.listContacts();
    res.json(contacts);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const normalizedId = Number(contactId);
  try {
    const findContact = await ctrl.getContactById(normalizedId);
    if (!findContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }
    res.json(findContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { error } = addContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
    return;
  }
  try {
    const newContact = await ctrl.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: { result: newContact },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const isFindedContact = await ctrl.removeContact(contactId);
    if (!isFindedContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const keysOfBody = Object.keys(req.body).length;
  if (!keysOfBody) {
    res
      .status(400)
      .json({ status: "error", code: 400, message: "Missing fields" });
    return;
  }
  const { error } = updateContactSchema.validate(req.body);
  if (error) {
    res.status(400).json({
      status: "error",
      code: 400,
      message: error.message,
    });
    return;
  }
  try {
    const { isFindedContact, updatedContact } = await ctrl.updateContact(
      contactId,
      req.body
    );
    if (!isFindedContact) {
      res.status(404).json({
        status: "error",
        code: 404,
        message: "Not found",
      });
      return;
    }
    res.json({
      status: "success",
      code: 200,
      data: { result: updatedContact },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
