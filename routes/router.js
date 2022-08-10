const { Router } = require("express");
const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");

const filePath = path.resolve(__dirname, "../db/contacts.json");

const router = Router();

const getContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(filePath));
  return contacts;
};

router.get("/", async (res) => {
  try {
    const contacts = await getContacts();
    res.json(contacts);
  } catch (error) {
    res.json({ error: error.massage });
  }
});

router.get("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contacts = await getContacts();
    const contact = contacts.find(
      (contact) => String(contact.id) === contactId
    );
    res.json(contact);
  } catch (error) {
    res.json({ error: error.massage });
  }
});

router.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newContact = { id: crypto.randomUUID(), ...body };
    const contacts = await getContacts();
    contacts.push(newContact);
    await fs.writeFile(filePath, JSON.stringify(contacts));
    res.json(newContact);
  } catch (error) {
    res.json({ error: error.massage });
  }
});

router.delete("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;

    const contacts = await getContacts();
    const updatedContacts = contacts.filter(
      (contact) => String(contact.id) !== contactId
    );

    await fs.writeFile(filePath, JSON.stringify(updatedContacts));
    res.json({ message: `User with id ${contactId} has been deleted` });
  } catch (error) {
    res.json({ error: error.massage });
  }
});

router.put("/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    const contacts = await getContacts();

    const index = contacts.findIndex(
      (contact) => String(contact.id) === contactId
    );
    contacts[index] = { ...contacts[index], ...body };

    await fs.writeFile(filePath, JSON.stringify(contacts));

    res.json(contacts[index]);
  } catch (error) {
    res.json({ error: error.massage });
  }
});

module.exports = router;
