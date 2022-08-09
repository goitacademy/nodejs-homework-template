const express = require("express");
const fs = require("fs/promises");
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

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.json({
    status: "success",
    code: 200,
    data,
  });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const data = await getById(id);
  res.json(data);
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message POST Contacts" });
});

router.delete("/:id", async (req, res, next) => {
  res.json({ message: "template message DELETE Contacts" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message EDIT Contacts" });
});

module.exports = router;
