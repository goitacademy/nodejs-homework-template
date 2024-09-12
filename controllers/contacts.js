const express = require("express");
const Joi = require("joi");
const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  update,
} = require("../service/contacts.service");

const getContacts = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(error);
  }
};

const getContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);
    res.status(200).json(contact);
  } catch (error) {
    if (error.message === "Contact not found") {
      res.status(404).json({ message: "Not found" });
    } else {
      next(error);
    }
  }
};

const createContact = async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;

    const schema = Joi.object({
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      phone: Joi.string().required(),
    });

    const { error } = schema.validate({ name, email, phone });

    if (error) {
      res.status(400).json({
        message: `missing required ${error.details[0].context.key} - field`,
      });
      return;
    }

    const newContact = await addContact(name, email, phone, req.user._id);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const deleteContact = async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    console.log(contactId);
    await removeContact(contactId);
    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    if (error.message === "Contact not found") {
      res.status(404).json({ message: "Not found" });
    } else {
      next(error);
    }
  }
};

const updateContact = async (req, res, next) => {
  try {
    const {
      user,
      body,
      params: { contactId },
    } = req;

    const schema = Joi.object({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
    });

    const { error } = schema.validate(body);

    if (error) {
      res.status(400).json({ message: "missing fields" });
      return;
    }

    const updatedContact = await update(user._id, contactId, body);
    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.message === "Contact not found") {
      res.status(404).json({ message: "Not found" });
    } else {
      next(error);
    }
  }
};

const updateFavorite = async (req, res, next) => {
  try {
    const {
      user,
      body,
      params: { contactId },
    } = req;
    const { favorite } = body;

    const schema = Joi.object().keys({
      favorite: Joi.boolean().required().messages({
        "boolean.base": "Favorite must be a boolean",
        "any.required": "Missing field favorite",
      }),
    });

    await schema.validateAsync(body);
    const updatedContact = await update(user._id, contactId, {
      favorite,
    });
    res.status(200).json(updatedContact);
  } catch (error) {
    if (error.message === "Contact not found") {
      res.status(404).json({ message: "Not found" });
    } else {
      next(error);
    }
  }
};
module.exports = {
  getContacts,
  getContact,
  createContact,
  deleteContact,
  updateFavorite,
  updateContact,
};
