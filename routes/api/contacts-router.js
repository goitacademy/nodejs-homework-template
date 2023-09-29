import express from "express";
import Joi from "joi";
import { HttpError } from "../../helpers/index.js";
import { contactsService } from "../../models/index.js";

const router = express.Router();

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email(),
  phone: Joi.string(),
}).or("name", "email", "phone");

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) throw HttpError(404, "Not found");
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { body } = req;
    const { error } = addSchema.validate(body);
    if (error) throw HttpError(400, error.message);
    const result = await contactsService.addContact(body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const { body } = req;
    console.log("body :>> ", body);

    const { error } = updateSchema.validate(body);
    if (error) throw HttpError(400, error.message);

    const result = await contactsService.updateContact(contactId, body);
    if (!result) throw HttpError(404, "Not found");

    res.json(result);
    // res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.removeContact(contactId);
    if (!result) throw HttpError(404, "Not found");
    // res.json(result);
    // res.status(200).json({ message: "contact deleted" });
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
