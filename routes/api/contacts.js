const express = require("express");
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
    return { message: "Not found", code: 404 };
  }
  return { status: "success", code: 200, data: contacts[index] };
};
const removeContact = async (id) => {
  const contacts = await listContacts();
  const index = contacts.findIndex(
    (item) => item.id.toString() === id.toString()
  );
  if (index === -1) {
    return { message: "Not found", code: 404 };
  }
  contacts.splice(index, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return { message: "contact deleted", code: 200 };
};
const updateContact = async (id, body) => {
  // let contacts = await listContacts();
  const { name, email, phone } = body;
  // contacts.forEach((item) => {
  //   if (item.id.toString() === id.toString()) {
  //     ({ name, email, phone });
  //   }
  // });
  return { code: 200, name, email, phone };
};

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json({
    status: "success",
    code: 200,
    data,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await getById(id);
  if (data.code === 404) {
    res.status(404).json(data);
    return;
  }
  res.status(200).json(data);
});

router.post("/", async (req, res, next) => {
  // тут нужно добавить валидацию на обязательные поля и обработку ошибки
  const { name, email, phone } = await req.body;
  const contacts = await listContacts();
  const newContact = {
    id: nanoid(5),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  res.status(201).json({ code: 201, ...newContact });
});

router.delete("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await removeContact(id);
  if (data.code === 404) {
    res.status(404).json(data);
    return;
  }
  res.status(200).json(data);
});

router.put("/:id", async (req, res, next) => {
  const { name, email, phone } = await req.body;
  if (!name && !email && !phone) {
    res.json({ message: "missing fields", code: 400 });
    return;
  }
  const { id } = req.params;
  const data = await updateContact(id, req.body);
  res.json(data);
});

module.exports = router;
