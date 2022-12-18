const express = require("express");
const contacts = require("../../models/contacts");
// app.get( "way", callback) коли прийде запит за цією адресою - зроби ''це''
// якщо нема потрібної лінки, то кеннот гет ''лінк''
// респонс.дсон - для відправляння джсону

const router = express.Router();

router.get("/", async (req, res, next) => {
  const data = await contacts.listContacts();
  res.json({ data, status: 200 });
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const data = await contacts.getContactById(contactId);
  if (!data) res.json({ message: "Not found", status: 404 });
  res.json({ data, status: 200 });
  // якщо помилка, то апп падає і неможливо надіслати наступний запит?
});

router.post("/", async (req, res, next) => {
  const result = await contacts.addContact(req.body)
  if (result === null) {
    res.json({ "message": "missing required name field", "status": 400 });
  } else if (result === 0) {
    // req.json({ "status": validationResult.error }); 
  } else {
    res.json({ "data": result, "status": 201 });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const bool = await contacts.removeContact(contactId);
  if (bool === null) {
    res.json({ message: "Not found", status: 404 });
  } else {
    res.json({ message: "contact deleted", status: 200 });
  }
});

router.put("/:contactId", async (req, res, next) => {
  // if (!req.body) {
  //   res.json({ message: "missing fields", status: 400 });
  // }
  // const { name, email, phone } = req.body;
  // const bool = await contacts.updateContact(contactId, body)
  // if(bool){
  // res.json({ "status": 201 });
  // } else {
  // res.json({ message: "missing required name field", status: 400 });
  // }
  // contacts.forEach((item) => {
  //   if (item.id === req.params.id) {
  //     item.name = name;
  //     item.email = email;
  //     item.phone = phone;
  //   }
  // });
});

module.exports = router;
