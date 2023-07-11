// const express = require("express");
// const contacts = require("./contacts");
import express from "express";
import {
  getContactById,
  listContacts,
  addContact,
} from "../../models/contacts.js";

export const router = express.Router();

router.get("/", async (req, res, next) => {
  // res.json({ message: "template message" });
  const data = await listContacts();
  res.json(data);
});

router.get("/:contactId", async (req, res, next) => {
  // res.json({ message: "template message" });
  const id = req.params.contactId;
  const data = await getContactById(id);
  // console.log(data);
  res.json(data);
});

router.post("/", async (req, res, next) => {
  // res.json({ message: "template message" });
  // console.log(name, email, phone);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.json({ message: "missing required name field" });
    return;
  }
  const data = await addContact(req.body);
  res.json(data);
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

// module.exports = router;
