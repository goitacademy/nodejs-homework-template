const fs = require("node:fs/promises");
const path = require("node:path");
const crypto = require("node:crypto");
const express = require("express");

const FILE_PATH = path.join(__dirname, "/.........");

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const contacts = await fs.readFile(" ");
    res.json(contacts);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

contactsRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    const contact = contacts.find((contact) => String(contact.id) === id);
    res.status(200).json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

contactsRouter.post("/", async (req, res) => {
  try {
    const { body } = req;
    const contact = { id: crypto.randomUUID(), ...body };
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    contacts.push(contact);

    await fs.writeFile(FILE_PATH, JSON.stringify(contacts));
    res.status(201).json(contact);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

contactsRouter.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const contacts = JSON.parse(await fs.readFile(FILE_PATH));
    const filteredContacts = contacts.filter(
      (contact) => String(contact.id) !== id
    );
    await fs.writeFile(FILE_PATH, JSON.stringify(filteredContacts));
    res.status(204).json();
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

contactsRouter.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

module.exports = contactsRouter;
