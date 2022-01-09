"use strict";
// const fs = require("fs").promises;
// const contacts = require("../model/Contacts/contacts.json");
// const path = require("path");
// const contactsPath = path.join(__dirname, "../model/Contacts/contacts.json");
const Joi = require("joi");

const Contacts = require("../model/Contacts/schema");

// ====================VALIDATION-START=====================
const validationSchema = Joi.object({
  id: Joi.number(),
  name: Joi.string()
    .regex(/^[a-zA-Zа-яА-Я ]*$/)
    .min(2)
    .max(30)
    .required(),
  email: Joi.string().email().required(),
  phone: Joi.string()
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[ ]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/)
    .required(),
  favorite: Joi.boolean().required(),
});

const isDataValid = (data) => {
  console.log("validation result: ", validationSchema.validate(data));
  return !validationSchema.validate(data).error;
};
// ====================VALIDATION-END=====================

async function readDB() {
  try {
    const result = await Contacts.find();
    console.log("Reading DB...");
    return result;
  } catch (error) {
    console.log("Read DB error: ", error);
  }
}

async function findById(id) {
  try {
    const result = await Contacts.findOne({ _id: id });
    console.log("Searching by ID...");
    return result;
  } catch (error) {
    console.log("Searching by ID error: ", error);
  }
}

async function removeById(id) {
  try {
    const result = await Contacts.findOneAndRemove({ _id: id });
    console.log("Removing by ID...");
    return result;
  } catch (error) {
    console.log("Removing by ID error: ", error);
  }
}

async function add(data) {
  try {
    const result = await Contacts.create(data);
    console.log("Creating new contact...");
    return result;
  } catch (error) {
    console.log("Contact creating error: ", error);
  }
}

async function update(id, contact) {
  try {
    const result = await Contacts.findOneAndUpdate({ _id: id }, { $set: contact }, { new: true });
    console.log("Updating by ID...");
    return result;
  } catch (error) {
    console.log("Updating by ID error: ", error);
  }
}

async function updateFavorite(id, body) {
  try {
    const result = await Contacts.findOneAndUpdate({ _id: id }, { $set: body }, { new: true });
    console.log("Favorite Updating...");
    return result;
  } catch (error) {
    console.log("Favorite Updating error: ", error);
  }
}

// ===============/\ /\ /\ /\ /\ /\=================
// =================================================
// =================================================

const listContacts = (req, res) => {
  readDB().then((result) => {
    return res.status(200).json(result);
  });
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const contactById = await findById(id);
  return contactById
    ? res.status(200).json(contactById)
    : res.status(404).json({ message: `contact with id:${id} not found` });
};

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const removedContactById = await removeById(id);
  return removedContactById
    ? res.status(200).json({ message: `contact with id:${id} deleted` })
    : res.status(404).json({ message: `contact with id:${id} not found` });
};

const addContact = async (req, res) => {
  try {
    const newContact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: req.body.favorite ? req.body.favorite : false,
    };

    if (!isDataValid(newContact)) {
      return res.status(400).json({ message: "missing required name field" });
    }

    const result = await add(newContact);

    return res.status(201).json(result);
  } catch (error) {
    console.log("Add new contact error: ", error);
  }
};

const updateContact = async (req, res) => {
  try {
    const id = req.params.contactId;
    const contact = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      favorite: req.body.favorite,
    };

    if (!isDataValid(contact)) {
      return res.status(400).json({ message: "missing required name field" });
    }

    const result = await update(id, contact);

    return res.status(201).json(result);
  } catch (error) {
    console.log("Update contact error: ", error);
  }
};

const updateFavoriteContact = async (req, res) => {
  try {
    const id = req.params.contactId;
    const favorite = {
      favorite: req.body.favorite,
    };
    if (typeof favorite.favorite !== "boolean") {
      return res.status(400).json({ message: "missing field favorite" });
    }
    const result = await updateFavorite(id, favorite);
    return res.status(201).json(result);
  } catch (error) {
    console.log("Update status error: ", error);
    return res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavoriteContact,
};
