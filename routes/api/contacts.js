const express = require("express");
const contacts = require("../../models/contacts");
const { HttpError } = require("../../helpers");
const Joi = require("joi");

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    const result = await contacts.getContactById(id);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    return res.json(result);
  } catch (error) {
    next(error);
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
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await contacts.removeContact(id);
    if (!result) {
      throw HttpError(404, "Contact not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { value } = addSchema.validate(req.body);
    const { id } = req.params;

    const all = await contacts.getContactById(id);

    if (Object.keys(value).length === 0) {
      throw HttpError(400, "Missing fields");
    } else if (value.id) {
      throw HttpError(400, "Not change id");
    } else if (value.name || value.phone || value.email) {
      const result = await contacts.updateContact(id, { ...all, ...req.body });
      if (!result) {
        throw HttpError(404, "Contact not found");
      }
      return res.json(result);
    } else {
       throw HttpError(400, "Missing fields");
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
