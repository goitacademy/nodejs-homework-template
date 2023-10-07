const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const fs = require("fs");

const contactsRouter = require("./routes/api/contacts");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/api/contacts", contactsRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ message: err.message });
});

const contactsFilePath = "modules/contacts.json";

const loadContacts = () => {
  try {
    const data = fs.readFileSync(contactsFilePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    console.error("Ошибка при чтении файла контактов:", error);
    return [];
  }
};

const contacts = loadContacts();

app.get("/contacts", (req, res) => {
  res.json(contacts);
});

app.post("/contacts", (req, res) => {
  const newContact = req.body;
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

const port = 3000;
app.listen(port, () => {
  console.log(`Сервер запущений на порту ${port}`);
});

module.exports = app;
