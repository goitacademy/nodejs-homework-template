import express from "express";

export const contactsRouter = express.Router();

contactsRouter.get("/", async (req, res, next) => {
  res.json({ message: "template message" });
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
