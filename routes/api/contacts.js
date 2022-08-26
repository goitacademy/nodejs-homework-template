const express = require("express");

const router = express.Router();
const { v4 } = require("uuid");

const {
  listContacts,
  getContactById,
  addContact,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const { postSchema, putSchema } = require("../../validation/validation");

router.get("/", async (req, res, next) => {
  const data = await listContacts();
  res.status(200).json({ data });
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  const result = await getContactById(id);
  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }
  res.status(200).json({ result: result });
});

router.post("/", async (req, res, next) => {
  const { value, error } = postSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "missing required name field",
    });
  }
  const newContact = { id: v4(), ...value };
  await addContact(newContact);

  res.status(201).json({ newContact });
});

router.delete("/:conId", async (req, res, next) => {
  const { conId } = req.params;
  const contacts = await listContacts();
  const idExists = contacts.find(({ id }) => id === conId);

  if (!idExists) {
    return res.status(404).json({
      message: "not found",
    });
  }

  await removeContact(conId);
  res.status(200).json({ message: "contact deleted" });
});

router.put("/:conId", async (req, res, next) => {
  const { conId } = req.params;
  const { value, error } = putSchema.validate(req.body);

  if (error) {
    return res.status(400).json({ message: "missing fields" });
  }
  const contacts = await listContacts();
  const findContact = contacts.find(({ id }) => id === conId);
  if (!findContact) {
    return res.status(404).json({ message: "not found" });
  }
  const updatedContact = await updateContact(conId, value);
  res.status(200).json(updatedContact);
});

module.exports = router;