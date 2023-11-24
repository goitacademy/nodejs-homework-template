const express = require("express");

const router = express.Router();
const contacts = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  const myContacts = await contacts
    .listContacts()
    .catch((e) => console.log(e.message));

  res.json({
    status: 200,
    data: myContacts,
  });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contactFound = await contacts
    .getContactById(contactId)
    .catch((e) => console.log(e.message));

  if (contactFound)
    res.json({
      status: 200,
      contactFound,
    });
  else
    res.json({
      status: 404,
      message: "Not found",
    });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
