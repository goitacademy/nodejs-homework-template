const express = require("express");

const contactsControl = require("../../controllers/controllers");
const contactsScheme = require("../../schemas/joi");

const router = express.Router();

const { HttpError } = require("../../helpers");

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsControl.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsControl.getContactById(id);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} was not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactsScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsControl.addContact(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contactsControl.removeContact(id);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} was not found.`);
    }
    res.status(200).json({ message: "Contact was successfully deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { error } = contactsScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    const result = await contactsControl.updateContact(id, req.body);
    if (!result) {
      throw HttpError(404, `Contact with id ${id} was not found.`);
    }
    console.log(result);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
