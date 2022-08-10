const express = require("express");
const Joi = require("joi");
const fs = require("fs/promises");
const { nanoid } = require("nanoid");
const path = require("path");
const contactsPath = path.normalize("db/contacts.json");
const router = express.Router();

const listContacts = async () =>
  JSON.parse(await fs.readFile(contactsPath, "utf8"));

const getById = async (id) => {
  const contacts = await listContacts();
  const normID = id.toString();
  const index = contacts.findIndex((item) => item.id.toString() === normID);
  if (index === -1) {
    return { message: "Not found" };
  }
  return { status: "success", data: contacts[index] };
};
const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return newContact;
};
const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (item) => item.id.toString() === id.toString()
  );
  if (index === -1) {
    return { message: "Not found" };
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return { message: "contact deleted" };
};
const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const { name, email, phone } = body;
  console.log(id, name, email, phone);
  contacts.forEach((item) => {
    if (item.id.toString() === id.toString()) {
      if (name) {
        item.name = name;
      }
      if (email) {
        item.email = email;
      }
      if (phone) {
        item.phone = phone;
      }
    }
  });
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return (await getById(id)) || { message: "missing fields" };
};

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json({
    status: "success",
    data,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await getById(id);
  if (data.message) {
    res.status(404).json(data);
    return;
  }
  res.status(200).json(data);
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = await req.body;
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
    phone: Joi.string().min(3).max(30).required(),
  });
  const validationResult = schema.validate(req.body);
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({ message: "missing required name field" });
  }
  const newContact = await addContact(name, email, phone);
  res.status(201).json({ ...newContact });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await removeContact(id);
  if (data.message) {
    res.status(404).json(data);
    return;
  }
  res.status(200).json(data);
});

router.put("/:id", async (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30),
    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
    phone: Joi.string().min(3).max(30),
  });
  const { name, email, phone } = await req.body;
  const validationResult = schema.validate(req.body);
  if (validationResult.error || (!name && !email && !phone)) {
    return res.status(400).json({ message: "missing fields" });
  }
  const { id } = req.params;
  const data = await updateContact(id, req.body);
  if (data.message) {
    res.status(404).json(data);
  }
  res.status(200).json(data);

  // res.status(404).json({ message: "Not found" });
});

module.exports = router;
