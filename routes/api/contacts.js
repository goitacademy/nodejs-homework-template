const express = require("express");
const fs = require("fs/promises");
const path = require("path");
const contactsPath = path.normalize("db/contacts.json");

const router = express.Router();
const listContacts = async () =>
  JSON.parse(await fs.readFile(contactsPath, "utf8"));

// router.get("/", async (req, res, next) => {
//   const contacts = await listContacts();
//   res.json({
//     status: "success",
//     code: 200,
//     data: contacts,
//   });
// });

router.get("/:id", async (req, res, next) => {
  // const contacts = await listContacts();
  const { id } = req.params;
  // console.log("REQUEST");
  const normID = id.toString();
  // const item = contacts.filter((item) => item.id.toString() === normID);
  res.json({
    status: "success",
    code: 200,
    data: normID,
  });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message POST Contacts" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message DELETE Contacts" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message EDIT Contacts" });
});

module.exports = router;
