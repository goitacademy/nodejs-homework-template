import express from "express";

import movieService from "../../models/contacts/index.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  const result = await movieService.listContacts();
  res.json(result);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  const result = await movieService.getContactById();
  res.json({ message: "template message" });
});

contactsRouter.post("/", async (req, res, next) => {
  const result = await movieService.addContact();
  res.json({ message: "template message" });
});

contactsRouter.delete("/:contactId", async (req, res, next) => {
  const result = await movieService.removeContact();
  res.json({ message: "template message" });
});

contactsRouter.put("/:contactId", async (req, res, next) => {
  const result = await movieService.updateContact();
  res.json({ message: "template message" });
});

export default contactsRouter;
