import express from "express";
import * as contactService from "../../models/contactsModel.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  const result = await contactService.listContacts();
  res.json(result);
});

contactsRouter.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
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

export default contactsRouter;
