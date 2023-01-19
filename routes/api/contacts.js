const express = require("express");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");

const router = express.Router();
const schema = require("./validate");

router.get("/", async (req, res, next) => {
  const cont = await listContacts();
  res.status(200).json(cont);
});

router.get("/:id", async (req, res, next) => {
  const contId = await getContactById(req.query.id);
  contId
    ? res.status(200).json(contId)
    : res.status(404).json({ message: "ID not found" });
});

router.post("/", async (req, res, next) => {
  const { name, email, phone } = req.body;
  const { error, value } = schema.validate({ name, email, phone });
  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }
  const newContacts = await addContact(req.body);

  res.status(201).json(newContacts);
});

router.delete("/:id", async (req, res, next) => {
  const deleteContactId = await removeContact(req.query.id);
  deleteContactId
    ? res.status(200).json(deleteContactId)
    : res.status(404).json({ message: "ID not found" });
});

router.put("/:id", async (req, res, next) => {
  const id = req.query.id;
  const body = req.body;
  const { name, email, phone } = body;
  const { error, value } = schema.validate({ name, email, phone });
  if (error) {
    res.status(400).json(error.details[0].message);
    return;
  }

  // if (Object.entries(body).length === 0) {
  //   res.status(400).json({ message: "Missing fields" });
  //   return;
  // }
  const updateId = await updateContact(id, body);
  if (updateId) {
    res.status(200).json(updateId);
  } else {
    res.status(404).json({ message: "ID Not found" });
  }
});

module.exports = router;
