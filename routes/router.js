const { Router } = require("express");
const fs = require("fs").promises;
const path = require("path");
const crypto = require("crypto");
const Joi = require("joi");

const contactTemplate = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
});
const filePath = path.resolve(__dirname, "../db/contacts.json");

const router = Router();

const getContacts = async () => {
  const contacts = JSON.parse(await fs.readFile(filePath));
  return contacts;
};

router.get("/contacts", async (req, res) => {
  try {
    const contacts = await getContacts();
    res.json(contacts);
  } catch (error) {
    res.json({ error: error.massage });
  }
});

router.get("/contacts/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const contacts = await getContacts();
    const contact = contacts.find((contact) => contact.id === contactId);
    if (!contact) {
      res
        .status(404)
        .json({ message: `User with id ${contactId} was not found` });
    }
    res.json(contact);
  } catch (error) {
    res.json({ error: error.massage });
  }
});

router.post("/contacts", async (req, res) => {
  try {
    const body = req.body;
    const { error } = contactTemplate.validate(body);
    if (error) {
      res.status(400).json({ message: ` ${error} field` });
    } else {
      const newContact = { id: crypto.randomUUID(), ...body };
      const contacts = await getContacts();
      contacts.push(newContact);
      await fs.writeFile(filePath, JSON.stringify(contacts));
      res.status(201).json(newContact);
    }
  } catch (error) {
    res.json({ error: error.massage });
  }
});

router.delete("/contacts/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;

    const contacts = await getContacts();
    const updatedContacts = contacts.filter(
      (contact) => contact.id !== contactId
    );

    await fs.writeFile(filePath, JSON.stringify(updatedContacts));
    res.json({ message: `User with id ${contactId} has been deleted` });
  } catch (error) {
    res.json({ error: error.massage });
  }
});

router.put("contacts/:contactId", async (req, res) => {
  try {
    const { contactId } = req.params;
    const body = req.body;

    const { error } = contactTemplate.validate(body);
    if (error) {
      res.status(400).json({ message: `Missing required  ${error} field` });
    } else {
      const contacts = await getContacts();
      const index = contacts.findIndex((contact) => contact.id === contactId);

      if (index === -1) {
        res.status(404).json({ message: "Not found" });
      }
      contacts[index] = { ...contacts[index], ...body };
      await fs.writeFile(filePath, JSON.stringify(contacts));

      res.json(contacts[index]);
    }
  } catch (error) {
    res.json({ error: error.massage });
  }
});

module.exports = router;
