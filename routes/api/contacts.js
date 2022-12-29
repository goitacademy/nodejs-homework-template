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
  try {
    const contacts = await listContacts();

    return res.json({
      status: "success",
      code: 200,
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await getContactById(req.params.contactId);

    if (!contact) {
      return res.json({
        status: "error",
        code: 404,
        message: `Not found contact with id- ${req.params.contactId}`,
      });
    }
    return res.status(200).json({
      status: "success",
      code: 200,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
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
