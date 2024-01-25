const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");
const contacts = require("../../models/contacts.json");
const schema = require("../../helpers/joiValid");

const router = express.Router();

router.get("/", async (req, res, next) => {
  await listContacts();
  res.json({
    status: "success",
    code: "200",
    data: {
      contacts,
    },
  });
});

router.get("/:id", async (req, res, next) => {
  await getContactById();
  const { id } = req.params;
  const contact = contacts.filter((contact) => contact.id === id);

  if (contact) {
    res.json({
      status: "successs",
      code: "200",
      data: { contact },
    });
  }
  res.json({ message: "not found" }).status(404);
});

router.post("/", async (req, res) => {
  const { name, email, phone } = req.body;
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.message });
  } else {
    res.json(result);
  }

  if (!req.body) {
    await addContact();
    res.json({ message: "missing required name - field" }).status(400);
  }
  const newContact = {
    id: contacts.length + 1,
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { newContact },
  });
});

router.delete("/:id", async (req, res, next) => {
  await removeContact();
  const { id } = req.params;
  const newContacts = contacts.findIndex((contact) => contact.id !== id);
  if (newContacts === -1) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:id", async (req, res, next) => {
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).json({ message: result.error.message });
  } else {
    res.json(result);
  }

  const { id } = req.params;
  const { name, email, phone } = req.body;
  if (!req.body) {
    res.json({ message: "missing fields" }).status(400);
  }

  const contact = contacts.find((el) => el.id === parseInt(id));

  if (contact) {
    await updateContact();
    contact.name = name;
    contact.email = email;
    contact.phone = phone;
    res.status(200).json(contact);
  } else {
    const contact = {
      id,
      name,
      email,
      phone,
    };
    contacts.push(contact);
  }
  res.json({ id }).status(201);
});
module.exports = router;
