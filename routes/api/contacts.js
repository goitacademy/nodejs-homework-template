import { Router } from "express";
import { listContacts } from "../../models/contacts.js";

const router = Router();

router.get("/", async (req, res, next) => {
  const list = await listContacts();
  res.send(list);
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export default router;
