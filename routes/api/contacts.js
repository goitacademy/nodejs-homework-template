import express from "express";
import { listContacts } from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await listContacts();
  res.json(result);
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: `GET/:{contactId} message` });
});

router.post("/", async (req, res, next) => {
  res.json({ message: "POST message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: `DELETE:contactId message` });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: `PUT:contactId message` });
});

export default router;
