import express from "express";
import { nanoid } from "nanoid";

import { listContacts } from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
	const contacts = await listContacts();
	res.json(contacts);
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
