const fs = require("fs/promises");
// const express = require("express");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const Joi = require("joi");
// const { status, readDB } = require("../helpers/status");

const contactsPath = path.join(__dirname, "../models/contacts.json");

const listContacts = async () => {
  try {
    const stringData = await fs.readFile(contactsPath, "utf-8");
    return JSON.parse(stringData);
  } catch (error) {
    console.error(error.message);
  }
};

const getContactById = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((item) => item.id === req.params.contactId);
    if (!result) res.status(404).json({ message: "Contact not found" });
    else res.json(result);
  } catch (error) {
    console.error(error.message);
  }
};

const removeContact = async (req, res, next) => {
  try {
    const contacts = await listContacts();
    const result = contacts.filter((item) => item.id !== req.params.contactId);
    const contact = contacts.find((item) => item.id === req.params.contactId);

    if (contact) {
      const newContacts = [...result];
      await fs.writeFile(contactsPath, JSON.stringify(newContacts), "utf-8");
      return res.status(200).json({ message: "Contact deleted" });
    } else {
      return res.status(404).json({ message: "Contact not found" });
    }
  } catch (error) {
    console.error(error.message);
  }
};

const addContact = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(15).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),
      phone: Joi.string().alphanum().min(4).max(15).required(),
    });

    const validationResult = schema.validate(req.body);

    if (validationResult.error) {
      return res.status(400).json({
        message: "missing required name field",
        status: validationResult.error,
      });
    } else {
      const newContact = req.body;
      newContact.id = uuidv4();
      const contacts = await listContacts();
      contacts.push(newContact);
      await fs.writeFile(contactsPath, JSON.stringify(contacts));
      return res.json(newContact);
    }
  } catch (error) {
    console.error(error);
  }
};

const updateContact = async (req, res, next) => {
  try {
    const schema = Joi.object({
      name: Joi.string().alphanum().min(3).max(15).required(),

      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ["com", "net"] },
        })
        .required(),

      phone: Joi.string().alphanum().min(4).max(15).required(),
    });

    const validationResult = schema.validate(req.body);

    const contacts = await listContacts();

    if (validationResult.error) {
      return res.status(400).json({
        message: "Not found",
        status: validationResult.error,
      });
    } else {
      const { name, email, phone } = req.body;

      contacts.forEach((contact) => {
        if (contact.id === req.params.contactId) {
          contact.name = name;
          contact.email = email;
          contact.phone = phone;
        }
      });
      await fs.writeFile(contactsPath, JSON.stringify(contacts), "utf-8");
      return res.json(contacts);
    }
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
