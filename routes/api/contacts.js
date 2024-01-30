import {
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";

import express from "express";
import { schema } from "../../helpers/joiValid.js";
import { indexContacts } from "../../controllers/indexContacts.js";

const router = express.Router();

router.get("/", indexContacts);

router.get("/:id", async (req, res, next) => {
  getContactById();
  const contacts = await listContacts();
  const { id } = req.params;
  const contact = contacts.filter((contact) => contact.id === id);

  if (contact) {
    return res.json({
      status: "successs",
      code: "200",
      data: { contact },
    });
  }
  return res.json({ message: "not found" }).status(404);
});

router.post("/", async (req, res) => {
  addContact();
  const contacts = await listContacts();

  const { name, email, phone } = req.body;

  if (!req.body) {
    await addContact();
    return res.json({ message: "missing required name - field" }).status(400);
  }

  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone,
  };
  const result = schema.validate(req.body);
  if (result.error) {
    return res.status(400).json({ message: result.error.message });
  } else {
    res.json(result);
  }
  contacts.push(newContact);
  return res.status(201).json({
    status: "success",
    code: 201,
    data: { newContact },
  });
});

router.delete("/:id", async (req, res, next) => {
  removeContact();
  const contacts = await listContacts();
  const { id } = req.params;
  const newContacts = contacts.findIndex((contact) => contact.id !== id);
  if (newContacts === -1) {
    return res.status(404).json({ message: "Not found" });
  }
  return res.status(200).json({ message: "contact deleted" });
});

router.put("/:id", async (req, res, next) => {
  const contacts = await listContacts();

  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!req.body) {
    return res.json({ message: "missing fields" }).status(400);
  }
  updateContact();

  const contact = contacts.find((el) => el.id === parseInt(id));

  if (contact) {
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    return res.status(200).json(contact);
  } else {
    const contact = {
      id: "id",
      name,
      email,
      phone,
    };
    const result = schema.validate(req.body);
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    } else {
      res.json(result);
    }
    contacts.push(contact);
  }
  return res.status(201).json({ id });
});
export { router };
