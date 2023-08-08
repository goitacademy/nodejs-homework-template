const express = require("express");
const crypto = require("node:crypto");
const fs = require("fs/promises");
const router = express.Router();
const path = require("path");
const { response } = require("../../app");
const contactsPath = path.join(__dirname, "../../db/contacts.json");
const jsonParcer = express.json();
const contactsSchemas = require("../../schemas/contacts");

async function listContacts(req, res, next) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    return res.send(JSON.parse(data));
  } catch (error) {
    next(error);
  }
}

async function getById(req, res) {
  const contactId = req.params.contactId;
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const contact = contacts.filter(
      (oneContact) => oneContact.id === contactId
    );
    if (!contact[0]) {
      return res.status(404).json({ message: "Contact not found" });
    }
    return res.send(contact);
  } catch (error) {
    res.status(404).send({ message: "Not found" });
    // next(error);
  }
}

async function addContact(body) {
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);
    const { name, email, phone } = body;
    const newContact = {
      id: crypto.randomUUID(),
      name: name,
      email: email,
      phone: phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    res.status(404).send({ message: "Not found" });
  }
}

async function removeContact(req, res) {
  const contactId = req.params.contactId;
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const contactIndex = contacts.findIndex(
      (oneContact) => oneContact.id === contactId
    );
    if (contactIndex === -1) {
      return res.status(404).json({ message: "Contact not found" });
    }
    contacts.splice(contactIndex, 1);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return res.status(200).json({ message: "contact deleted" });
  } catch (error) {
    res.status(404).send({ message: "Not found" });
  }
}

async function updateContact(contactId, body) {
  const { name, email, phone } = body;
  console.log(contactId);
  try {
    const data = await fs.readFile(contactsPath, "utf-8");
    const contacts = JSON.parse(data);

    const contactIndex = contacts.findIndex(
      (oneContact) => oneContact.id === contactId
    );
    if (contactIndex === -1) {
      return res.status(404).json({ message: "Contact not found" });
    }
    contacts.splice(contactIndex, 1);
    const newContact = {
      id: crypto.randomUUID(),
      name: name,
      email: email,
      phone: phone,
    };

    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

    return newContact;
  } catch (error) {
    res.status(404).send({ message: "Not found" });
  }
}

router.get("/", listContacts);

router.get("/:contactId", getById);

router.post("/", jsonParcer, async (req, res, next) => {
  const response = contactsSchemas.validate(req.body);
  if (typeof response.error !== "undefined") {
    console.log(response.error);
    return res.status(400).send({ message: "missing required name field" });
  } else {
    const newContact = await addContact(req.body);
    res.status(201).send(newContact);
  }
});

router.delete("/:contactId", removeContact);

router.put("/:contactId", jsonParcer, async (req, res, next) => {
  const contactId = req.params.contactId;

  const response = contactsSchemas.validate(req.body);
  if (typeof response.error !== "undefined") {
    return res.status(400).json({ message: "missing fields" });
  } else {
    const newContact = await updateContact(contactId, req.body);
    res.status(200).send(newContact);
  }
});

module.exports = router;
