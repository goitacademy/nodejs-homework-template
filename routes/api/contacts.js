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
  updateContact,
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
    const id = req.params.contactId;
    const contact = await getContactById(id);

    if (!contact) {
      return res.json({
        status: "error",
        code: 404,
        message: `Not found contact with id- ${id}`,
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
  try {
    const contact = await addContact(req.body);

    return res.status(201).json({
      status: "success",
      code: 201,
      message: `Contact has been added`,
      data: {
        contact,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await removeContact(req.params.contactId);

    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      message: `Contact deleted with id ${req.params.contactId}`,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const contact = await updateContact(req.params.contactId, req.body);

    if (!contact) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found" });
    }

    return res.status(200).json({
      status: "success",
      code: 200,
      data: { contact },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
