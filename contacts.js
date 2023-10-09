const express = require("express");
const router = express.Router();

const contactsFilePath = "modules/contacts.json";

const loadContacts = () => {
  try {
    const data = fs.readFileSync(contactsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Помилка при читанні файла контактів:", error);
    return [];
  }
};

const contacts = loadContacts();

app.get("/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;
  if (!newContact.name || !newContact.email) {
    return res.status(400).json({ error: "Невірний формат даних контакта" });
  }
  contacts.push(newContact);
  res.status(201).json(newContact);
});

app.get("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const contact = contacts.find((c) => c.id === contactId);
  if (!contact) {
    return res.status(404).json({ error: "Контакт не знайдений" });
  }
  res.json(contact);
});

app.put("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const updatedContact = req.body;
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) {
    return res.status(404).json({ error: "Контакт не знайдений" });
  }

  if (!updatedContact.name || !updatedContact.email) {
    return res.status(400).json({ error: "Невірний формат даних контакта" });
  }

  contacts[index] = updatedContact;
  res.json(updatedContact);
});

app.delete("/contacts/:id", (req, res) => {
  const contactId = req.params.id;
  const index = contacts.findIndex((c) => c.id === contactId);
  if (index === -1) {
    return res.status(404).json({ error: "Контакт не знайдений" });
  }
  contacts.splice(index, 1);
  res.status(204).send();
});
module.exports = router;
