// const { query } = require("express");
const express = require("express");
const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

const {
  validationAddedContact,
  validationUpdatedContact,
} = require("./validation");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const list = await listContacts();
    return res.json({ status: "success", code: 200, payload: list });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const list = await getContactById(req.params.contactId);
    if (!list) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found." });
    }

    return res.json({ status: "success", code: 200, payload: list });
  } catch (error) {
    next(error);
  }
});

router.post("/", validationAddedContact, async (req, res, next) => {
  try {
    const body = req.body;
    const item = await addContact(body);
    return res
      .status(201)
      .json({
        status: "success",
        code: 201,
        message: "New contact was created.",
        payload: item,
      });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const item = await removeContact(req.params.contactId);
    if (!item) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found." });
    }

    return res.json({
      status: "success",
      code: 200,
      message: "Contact deleted.",
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", validationUpdatedContact, async (req, res, next) => {
  try {
    const item = await updateContact(req.params.contactId, req.body);
    if (!item) {
      return res
        .status(404)
        .json({ status: "error", code: 404, message: "Not found." });
    }

    return res.json({
      status: "success",
      code: 200,
      message: "Contact updated.",
      payload: item,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
