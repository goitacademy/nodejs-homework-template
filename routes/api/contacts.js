// const express = require("express");
import express from "express";
// const {
//   listContacts,
//   getContactById,
//   addContact,
//   removeContact,
//   updateContact,
// } = require("../../models/contacts.js");
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts";
// const { contactValidator } = require("./../../utils/validators/validator.js");
import { contactValidator } from "./../../utils/validators/validator.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const contacts = await listContacts();
  console.log("GET /", contacts);
  res.status(200).json(contacts);
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.post("/", async (req, res, next) => {
  const { error } = contactValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const contact = await addContact(req.body);
  console.log(typeof contact);
  if (contact) {
    res.status(201).json(contact);
  } else {
    res.status(400).json({ message: "missing required name field" });
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const contact = await removeContact(contactId);
  if (contact) {
    res.status(200).json({ message: "contact deleted" });
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { error } = contactValidator(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });
  const { name, email, phone } = req.body;
  const { contactId } = req.params;
  if (!name && !email && !phone) {
    res.status(400).json({ message: "missing fields" });
  }
  const contact = await updateContact(contactId, req, body);
  if (contact) {
    res.status(200).json(contact);
  } else {
    res.status(404).json({ message: "Not found" });
  }
});

// module.exports = router;

export default router;
