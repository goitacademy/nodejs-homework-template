import contacts from "../../models/contacts.json";
const express = require("express");
const { HttpEror } = require("../../helpers/index.js");

const contactsService = require("../../models/contacts.js");

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const result = await contactsService.listContacts();
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await contactsService.getContactById(contactId);
    if (!result) {
      throw HttpEror(404, `Contact with id=${contactId} not found`);
    }
    res.json(result);
  } catch (error) {
    next(error);
  }
});

contactsRouter.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = contactsRouter;

contactsRouter.get("/contacts", (req, res) => {
  res.json(contacts);
});

contactsRouter.get("/contacts/:id", (req, res) => {
  res.json(contacts[0]);
});

contactsRouter.post("/contacts", (req, res) => {
  res.json(contacts[0]);
});
