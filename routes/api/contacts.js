import express from "express";
import Joi from "joi";

import contactsService from "../../models/contacts.js";

import { HttpError } from "../../helpers/index.js";

const router = express.Router();

const contactAddSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": `missing required name field`,
  }),
  email: Joi.string().email().required().messages({
    "any.required": `missing required email field`,
  }),
  phone: Joi.string().required().messages({
    "any.required": `missing required phone field`,
  }),
});

router.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpError(404);
      // 3 спосіб
      // throw HttpError(404, `Not found ID=${contactId}`);
      // 2 спосіб
      // const error = new Error(`Not found id=${contactId}`);
      // error.status = 404;
      // throw error;
      // 1 спосіб
      // return res.status(404).json({
      //   message: `Not found id=${contactId}`,
      // });
    }
    res.json(result);
  } catch (error) {
    next(error);
    // 2 спосіб
    // const { status = 500, message = "Server error" } = error;
    // res.status(status).json({
    //   message,
    // });
    // 1 спосіб
    // res.status(500).json({
    //   message: "Server error",
    // });
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    // console.log(error);
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await contactsService.addContact(req.body);
    res.status(201).json(result);
    // console.log(req.body);
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = contactAddSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "missing fields");
    }
    const { contactId } = req.params;
    const result = await contactsService.updateContact(contactId, req.body);
    if (!result) {
      throw HttpError(404);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const result = await contactsService.removeContact(contactId);
    if (!result) {
      throw HttpError(404);
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

export default router;
