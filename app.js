const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const Joi = require("joi");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

// 404 - Not Found
app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

// 500 - Server Error
app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

module.exports = app;

// Funkcje do obsługi plików JSON

const fs = require("fs");

function listContacts() {
  const contactsData = fs.readFileSync("contacts.json", "utf-8");
  const contacts = JSON.parse(contactsData);
  return contacts;
}

function getById(id) {
  const contacts = listContacts();
  const contact = contacts.find((contact) => contact.id === id);
  return contact;
}

function addContact(contactData) {
  const contacts = listContacts();
  const newContact = {
    id: Math.floor(Math.random() * 100000),
    ...contactData,
  };
  contacts.push(newContact);

  fs.writeFileSync("contacts.json", JSON.stringify(contacts));
  return newContact;
}

function removeContact(id) {
  const contacts = listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return null;
  }

  contacts.splice(contactIndex, 1);
  fs.writeFileSync("contacts.json", JSON.stringify(contacts));
  return true;
}

function updateContact(id, updatedData) {
  const contacts = listContacts();
  const contactIndex = contacts.findIndex((contact) => contact.id === id);

  if (contactIndex === -1) {
    return null;
  }

  contacts[contactIndex] = { ...contacts[contactIndex], ...updatedData };
  fs.writeFileSync("contacts.json", JSON.stringify(contacts));
  return contacts[contactIndex];
}

// Schematy walidacji

const contactSchema = Joi.object({
  name: Joi.string().required().min(3).max(30),
  email: Joi.string().required().email(),
  phone: Joi.string().required().min(9).max(15),
});

const updateContactSchema = Joi.object({
  name: Joi.string().min(3).max(30),
  email: Joi.string().email(),
  phone: Joi.string().min(9).max(15),
});

// Routing

app.get("/api/contacts", (req, res) => {
  const contacts = listContacts();
  res.status(200).json(contacts);
});

app.get("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const contact = getById(id);

  if (!contact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(contact);
});

app.post("/api/contacts", (req, res) => {
  const { error } = contactSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const { name, email, phone } = req.body;

  const newContact = addContact({ name, email, phone });
  res.status(201).json(newContact);
});





app.delete("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const isDeleted = removeContact(id);

  if (!isDeleted) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json({ message: "contact deleted" });
});

app.put("/api/contacts/:id", (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  if (!updatedData) {
    return res.status(400).json({ message: "missing fields" });
  }

  const updatedContact = updateContact(id, updatedData);

  if (!updatedContact) {
    return res.status(404).json({ message: "Not found" });
  }

  res.status(200).json(updatedContact);
});
