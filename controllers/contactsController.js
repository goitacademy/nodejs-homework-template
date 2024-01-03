const ContactsService = require("../models/contacts.js");
const HttpError = require("../error/error.js");
const express = require("express");
const app = express();

app.get("/api/contacts", async (req, res, next) => {
  try {
    const contacts = await ContactsService.listContacts();
    res.status(200).json(contacts);
  } catch (error) {
    next(new HttpError(500, error.message));
  }
});

module.exports = app;
