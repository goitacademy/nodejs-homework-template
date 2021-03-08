const express = require("express");
const router = express.Router();
const { HttpCode } = require("../../helpers/constants");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("../../validation/contactsValidation");

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  // eslint-disable-next-line no-unused-vars
  updateContact,
} = require("../../model/contactsServises.js");

router.get("/", (req, res, next) => {
  try {
    const contacts = listContacts();
    res.json({
      status: "success",
      code: HttpCode.OK,
      contacts,
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", (req, res, next) => {
  try {
    const contact = getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        contact,
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", validateCreateContact, async (req, res, next) => {
  try {
    const contact = await addContact(req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
      contact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", (req, res, next) => {
  try {
    const data = removeContact(req.params.contactId);
    if (data) {
      return res.json({
        status: HttpCode.OK,
        message: "contact deleted",
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", validateUpdateContact, (req, res, next) => {
  try {
    const contact = updateContact(req.params.contactId, req.body);
    if (contact) {
      return res.json({
        status: "success",
        code: HttpCode.OK,
        contact,
      });
    } else {
      return next({
        status: HttpCode.NOT_FOUND,
        message: "Not found contact",
        data: "Not Found",
      });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
