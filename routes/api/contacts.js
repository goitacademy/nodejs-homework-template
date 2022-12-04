const express = require("express");

const router = express.Router();

const { HttpError } = require("../../helpers");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const { validatingSchema } = require("../../schemas/contacts");

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const result = await getContactById(req.params.contactId);
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
    const { error } = validatingSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing required name field");
    }

    const objToPost = { id: String(Math.random()), ...req.body };
    const result = await addContact(objToPost);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const result = await removeContact(req.params.contactId);

    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json({
      message: "Contact deleted",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = validatingSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }

    const result = await updateContact(req.params.contactId, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }

    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
