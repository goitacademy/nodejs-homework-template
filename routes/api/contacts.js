const express = require("express");
const {
  listContacts,
  addContact,
  getContactById,
  removeContact,
  updateContact,
} = require("../../models/contacts");
const createError = require("http-errors");
const { schema } = require("./schemes");
const { validateData } = require("../../middlewars/validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();
    res.json({
      status: "success",
      code: 200,
      data: {
        result: contacts,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const result = await getContactById(contactId);
    if (!result) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", validateData(schema), async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const result = await addContact(name, email, phone);
    res.status(201).json({
      status: "success",
      code: 201,
      data: {
        result,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const removedContact = await removeContact(req.params.contactId);
    if (!removedContact) {
      throw createError(404, "Not found");
    }
    return res
      .status(200)
      .json({ status: "accepted", code: 200, message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validateData(schema), async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const updatedContact = await updateContact(
      req.params.contactId,
      name,
      email,
      phone
    );
    if (!updatedContact) {
      throw createError(404, "Not found");
    }
    res.json({
      status: "success",
      code: 200,
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
