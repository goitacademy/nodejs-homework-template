"use strict";
import express from "express";

export const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({ message: "This is main router /" });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({ message: `GET/:contactId message` });
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

// export default router;
