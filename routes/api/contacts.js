import express from "express";
import { getContactById, listContacts } from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const result = await listContacts();
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

router.get("/:contactId", async (req, res, next) => {
  const result = await getContactById("0");
  console.log("req :>> ", req);
  if (result === null) {
    res.status(404).json({ message: "Not found" });
  }
  res.json(result);
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
