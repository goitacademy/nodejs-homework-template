/** @format */

// const express = require('express')
import express from "express";

// import {listContacts} from "../../models/contacts.js";
// import contacts from "../../models/contacts.json";

import contactsService from "../../models/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  const result = await contactsService.listContacts();
  res.json(result);
  // res.json({
  //   message: "template message",
  // });
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const result = await contactsService.getContactById();
  res.json(result);
  // res.json({message: "template message"});
});

contactsRouter.post("/", async (req, res, next) => {
  const result = await contactsService.addContact(body);
  res.json(result);
  // res.json({message: "template message"});
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const result = await contactsService.removeContact();
  res.json(result);
  // res.json({message: "template message"});
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  const result = await contactsService.removeContact(contactId, body);
  res.json(result);
  // res.json({message: "template message"});
});

// module.exports = router
export default contactsRouter;
