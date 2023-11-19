const express = require("express");
const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");

const router = express.Router();
const contactsPath = path.join(__dirname, "../../db/contacts.json");
const contactSchema = require("../../schemas/contact");

async function addContact(name, email, phone) {
  const data = await fs
    .readFile(contactsPath, { encoding: "utf-8" })
    .then()
    .catch();
  const parsedData = JSON.parse(data);
  const newContact = {
    id: crypto.randomUUID(),
    name: name,
    email: email,
    phone: phone,
  };
  const targetContact = parsedData.find((contact) => contact.name === name);
  if (targetContact !== undefined) {
    console.log(`${name} is already in contacts`);
    return;
  }
  const newData = [...parsedData, newContact];
  await fs.writeFile(contactsPath, JSON.stringify(newData, undefined, 2));
  return newContact;
}

async function updateContact(contactId, body) {
  const data = await fs
  .readFile(contactsPath, { encoding: "utf-8" })
  .then()
  .catch();
  const parsedData = JSON.parse(data);
  const targetContact = parsedData.find((contact) => contact.id === contactId);
  if (targetContact === undefined) {
    return("not found");
  }
  const { name, email, phone } = body;
  targetContact.name = name;
  targetContact.email = email;
  targetContact.phone = phone;

  const index = parsedData.findIndex((n) => n.id === contactId);
  if (index !== -1) {
    parsedData.splice(index, 1);
  }

  const newData = [...parsedData, targetContact];
  await fs.writeFile(contactsPath, JSON.stringify(newData, undefined, 2));
  return targetContact;
};

router.get("/", async (req, res, next) => {
  try {
    const data = await fs
      .readFile(contactsPath, { encoding: "utf-8" })
      .then()
      .catch();

    res.status(200).send(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });

    const targetContact = JSON.parse(data).find(
      (contact) => contact.id === contactId
    );

    if (targetContact === undefined) {
      res.status(404).json({ message: "Not found" });
    }

    res.status(200).send(targetContact);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const response = contactSchema.validate(req.body, { abortEarly: false });

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: `missing required name field` });
  }

  const { name, email, phone } = response.value;

  const newContact = await addContact(name, email, phone);

  res.status(201).send(newContact);
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
    let parsedData = JSON.parse(data);
    const targetContact = parsedData.find(
      (contact) => contact.id === contactId
    );

    if (targetContact === undefined) {
      res.status(404).json({ message: "Not found" });
    }

    const index = parsedData.findIndex((n) => n.id === contactId);
    if (index !== -1) {
      parsedData.splice(index, 1);
    }

    await fs.writeFile(contactsPath, JSON.stringify(parsedData, undefined, 2));

    res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const response = contactSchema.validate(req.body, { abortEarly: false });

  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing fields" });
  }

  const body = response.value;

  const updatedContact = await updateContact(contactId, body);

  if (updatedContact === "not found") {
    res.status(404).json({ "message": "Not found" });
  }

  res.status(200).send(updatedContact);
});

module.exports = router;
