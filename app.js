const express = require("express");
const logger = require("morgan");

const {
  addContact,
  getContactById,
  listContacts,
  removeContact,
  updateContact,
} = require("./models/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));

app.get("/api/contacts", async (req, res) => {
  const contacts = await listContacts();
  res.json(contacts);
});

app.get("/api/contacts/:id", async (req, res) => {
  const contact = await getContactById(req.params.id);
  if (!contact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json(contact);
});

app.post("/api/contacts", async (req, res) => {
  const newContact = req.body;
  await addContact(newContact);
  res.status(201).json(newContact);
});

app.delete("/api/contacts/:id", async (req, res) => {
  const deleted = await removeContact(req.params.id);
  if (!deleted) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json({ message: "Contact deleted" });
});

app.put("/api/contacts/:id", async (req, res) => {
  const { id } = req.params;
  const newData = req.body;
  const updatedContact = await updateContact(id, newData);
  if (!updatedContact) {
    return res.status(404).json({ message: "Contact not found" });
  }
  res.json(updatedContact);
});

app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

module.exports = app;
