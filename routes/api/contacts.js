import express from "express";
import { listContacts } from "../../models/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  try {
    const allContacts = await listContacts();

    res.json(allContacts);
  } catch (error) {
    next(error);
  }
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
