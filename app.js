const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs/promises");
const path = require("path");

const contactsFilePath = path.join(__dirname, "../../contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsFilePath);
  const contacts = JSON.parse(data);
  return contacts;
}

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

app.get("/api/contacts", async (req, res, next) => {
  const contacts = await listContacts();
  res.json(contacts);
});

app.get("/api/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const contacts = await listContacts();
    const contact = contacts.find((c) => c.id === Number(id));
    if (contact) {
      res.json(contact);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    next(error);
  }
});

app.post("/api/contacts", async (req, res, next) => {
  const { name, email, phone } = req.body;
  try {
    const newContact = { name, email, phone };
    const contacts = await listContacts();
    newContact.id = contacts.length + 1;
    contacts.push(newContact);
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
});

app.delete("/api/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter((c) => c.id !== Number(id));
    await fs.writeFile(
      contactsFilePath,
      JSON.stringify(updatedContacts, null, 2)
    );
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

app.put("/api/contacts/:id", async (req, res, next) => {
  const { id } = req.params;
  const { name, email, phone } = req.body;
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((c) => c.id === Number(id));
    if (index === -1) {
      return res.status(404).json({ message: "Not found" });
    }
    if (!name && !email && !phone) {
      return res.status(400).json({ message: "missing fields" });
    }
    contacts[index] = { ...contacts[index], name, email, phone };
    await fs.writeFile(contactsFilePath, JSON.stringify(contacts, null, 2));
    res.json(contacts[index]);
  } catch (error) {
    next(error);
  }
});

module.exports = app;
