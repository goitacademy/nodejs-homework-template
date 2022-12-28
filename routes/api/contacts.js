const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();
const Joi = require("joi");

const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  // res.json({ message: "template message" });
  try {
    const contactsData = await listContacts();
    console.log("contact ", contacts);
    return res.json({
      status: "success",
      code: 200,
      data: {
        contactsData,
      },
    });
  } catch (error) {
    next(error);
  }
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

module.exports = router;
