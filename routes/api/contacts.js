import express from "express";
import * as contactsService from "../../models/contacts.js";

const contactsRouter = express.Router();

contactsRouter.get("/");

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
