import express from "express";
import {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} from "../../models/contacts.js";

const router = express.Router();

router.get("/", async (req, res, next) => {
  const result = await listContacts();

  if (result.hasOwnProperty("message")) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: result.message,
      data: "Not found",
    });
  }

  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
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
