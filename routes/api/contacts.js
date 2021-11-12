/* eslint-disable quotes */
/* eslint-disable semi */
const express = require("express");
const router = express.Router();
const contactsActions = require("../../model");

router.get("/", async (req, res, next) => {
  try {
    const data = await contactsActions.listContacts();
    res.json({
      status: "success",
      code: 200,
      data: data
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await contactsActions.getContactById(contactId);
    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: data
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const data = await contactsActions.addContact(req.body);
    res.status(201).json({
      status: "success",
      code: 201,
      data: data
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  try {
    const data = await contactsActions.removeContact(contactId);
    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      message: "contact deleted",
      data: data
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  const { contactId } = req.params;
  const { name, email, phone } = req.body;
  try {
    const data = await contactsActions.updateContact(contactId, req.body);
    if (!name ?? !email ?? !phone) {
      const error = new Error("missing fields");
      error.status = 400;
      throw error;
    }
    if (!data) {
      const error = new Error("Not found");
      error.status = 404;
      throw error;
    }
    res.status(200).json({
      status: "success",
      code: 201,
      data: data
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
