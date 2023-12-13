import express from "express";
import contacts from "../../models/contacts.js";
import Joi from "joi";
import helpers from "../../helpers/index.js";

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});

router.get("/", async (_, res, next) => {
  try {
    const result = await contacts.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.getContactById(contactId);
    if (!result) {
      throw helpers.HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw helpers.HttpError(400, error.message);
    }
    const result = await contacts.addContact(req.body);

    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contacts.removeContact(contactId);
    if (!result) {
      throw helpers.HttpError(404, "Not found");
    }
    res.status(200).json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw helpers.HttpError(400, error.message);
    }
    const { contactId } = req.params;
    const result = await contacts.updateById(contactId, req.body);
    if (!result) {
      throw helpers.HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

export default router;
