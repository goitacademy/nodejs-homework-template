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
      data: { data }
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const data = await contactsActions.getContactById(contactId);
    if (!data) {
      const error = new Error("Contact not found");
      error.status = 404;
      throw error;
    }
    res.json({
      status: "success",
      code: 200,
      data: { data }
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
      data: { data }
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

router.patch("/:contactId", async (req, res, next) => {
  res.json({ message: "template message" });
});

module.exports = router;
