import express from "express";

import { showContacts } from "../../controllers/contacts/showContacts.js";

import { showContactById } from "../../controllers/contacts/showContactById.js";
const router = express.Router();

router.get("/", showContacts);

router.get("/:contactId", showContactById);

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export { router };
