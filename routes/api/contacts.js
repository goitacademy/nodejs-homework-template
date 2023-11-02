const express = require("express");
const method = require("../../models/contacts");
const { HttpError, ValidationSchema, PatchSchema } = require("../../helpers");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const answer = await method.listContacts();
    res.json(answer);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const answer = await method.getContactById(contactId);
    res.json(answer);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = ValidationSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const answer = await method.addContact(req.body);
    return res.status(201).json(answer);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const answer = await method.removeContact(contactId);
    if (!answer) {
      throw HttpError(404, "Not found");
    }

    res.json({ message: "Delete success!" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    // if (!req.body) {
    //   throw HttpError(400, "Missig fields");
    // }
    const { error } = ValidationSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;
    const answer = await method.updateContact(contactId, req.body);
    if (!answer) {
      throw HttpError(404, "Not found");
    }

    res.json(answer);
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const { error } = PatchSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }

    const { contactId } = req.params;

    const answer = await method.changeContact(contactId, req.body);
    if (!answer) {
      throw HttpError(404, "Not found");
    }

    res.json(answer);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
