/* const express = require("express");
const Joi = require("joi");

const router = express.Router(); */
const { Contact } = require("../models/contact");
const HttpError = require("../helpers/HttpError");

const get = async (req, res, next) => {
  try {
    const result = await Contact.find();
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const getContactById = async (req, res, next) => {
  console.log(req.params);
  try {
    const { contactId } = req.params;
    const result = await Contact.findById(contactId);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const addContact = async (req, res, next) => {
  try {
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await Contact.findByIdAndDelete(contactId);
    console.log(result);
    if (!result) {
      res.status(404).json({ message: "Not found" });
    }
    res.json({
      message: "contact deleted",
    });
  } catch (error) {
    next(error);
  }
};
const updateContact = async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: "HttpError is not a constructor" });
      return;
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      throw new HttpError(404, "Not found");
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

const updateStatusContact = async (req, res) => {
  try {
    const keys = Object.keys(req.body);

    if (keys.length === 0) {
      throw HttpError(400, "missing field favorite");
    }
    const { contactId } = req.params;
    const result = await Contact.findByIdAndUpdate(contactId, req.body, {
      new: true,
    });
    if (!result) {
      res.status(404).json({ message: "Not found" });
      return;
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  get,
  getContactById,
  addContact,
  removeContact,
  updateStatusContact,
  updateContact,
};

/*
const addSchema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": "Missing required name field",
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    })
    .required()
    .messages({
      "any.required": "Missing required email field",
    }),
  phone: Joi.number().required().messages({
    "any.required": "Missing required phone field",
  }),
});

const updateSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  phone: Joi.number(),
});
*/
