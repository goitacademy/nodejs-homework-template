"use strict";
const fs = require("fs").promises;
const contacts = require("../model/contacts.json");
const path = require("path");
const contactsPath = path.join(__dirname, "../model/contacts.json");
const Joi = require("joi");

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
    .pattern(/^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/)
    .required(),
});

const isDataValid = (data) => {
  console.log("validation result: ", validationSchema.validate(data));
  return !validationSchema.validate(data).error;
};
// ====================VALIDATION-END=====================

async function readJsonFile() {
  try {
    const result = await fs.readFile(contactsPath, "utf8");
    return JSON.parse(result);
  } catch (error) {
    console.log("Read .JSON file error: ", error);
  }
}

const listContacts = (req, res) => {
  readJsonFile().then((result) => {
    return res.status(200).json(result);
  });
};

const getContactById = async (req, res) => {
  const id = req.params.contactId;
  const contactById = await readJsonFile().then((data) => data.find((item) => item.id === id));
  return contactById
    ? res.status(200).json(contactById)
    : res.status(404).json({ message: `contact with id:${id} not found` });
};

const removeContact = async (req, res) => {
  const id = req.params.contactId;
  const modifiedContactsList = await readJsonFile().then((data) => data.filter((item) => item.id !== id));
  try {
    if (modifiedContactsList.length !== contacts.length) {
      await fs.writeFile(contactsPath, JSON.stringify(modifiedContactsList), (err) => {
        if (err) throw err;
      });
      return res.status(200).json({ message: `contact with id:${id} deleted` });
    } else {
      res.status(404).json({ message: `contact with id:${id} not found` });
    }
  } catch (error) {
    console.log("Write to .JSON file error: ", error);
  }
};

const getNextUniqueId = async () => {
  try {
    let lastId = 0;

    const listOfContacts = await readJsonFile().then((data) => data);
    listOfContacts.forEach((item) => (+item.id > lastId ? (lastId = +item.id) : true));
    console.log("New unique ID: ", (+lastId + 1).toString());
    return (+lastId + 1).toString();
  } catch (error) {
    console.log("getNextUniqueId error:", error);
  }
};

const addContact = async (req, res) => {
  try {
    const newContact = {
      id: await getNextUniqueId().then((data) => data),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
    };

    if (!isDataValid(newContact)) {
      return res.status(400).json({ message: "missing required name field" });
    }

    const modifiedContactsList = await readJsonFile().then((data) => [...data, newContact]);
    await fs.writeFile(contactsPath, JSON.stringify(modifiedContactsList), (err) => {
      if (err) throw err;
    });
    return res.status(201).json(newContact);
  } catch (error) {
    console.log("Add new contact error: ", error);
  }
};

const updateContact = async (req, res) => {
  try {
    const id = req.params.contactId;
    const contactsList = await readJsonFile().then((result) => result);
    const updateContact = contactsList.find((item) => item.id === id);
    updateContact.name = req.body.name;
    updateContact.email = req.body.email;
    updateContact.phone = req.body.phone;
    if (!isDataValid(updateContact)) {
      return res.status(400).json({ message: "missing fields" });
    }
    await fs.writeFile(contactsPath, JSON.stringify(contactsList), (err) => {
      if (err) throw err;
    });
    return res.status(200).json(updateContact);
  } catch (error) {
    console.log("Update contact error: ", error);
    return res.status(404).json({ message: "Not found" });
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
