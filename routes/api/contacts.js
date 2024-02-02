import express from "express";
import {
  listContacts,
  getContactById,
  removeContact,
} from "../../models/contacts.js";
const router = express.Router();

router.get("/", listContacts);

router.get("/:contactId", getContactById);

router.post("/", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.delete("/:contactId", removeContact);

router.put("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

export { router };
