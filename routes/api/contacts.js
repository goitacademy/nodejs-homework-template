/* eslint-disable semi */
/* eslint-disable quotes */
/* eslint-disable no-unused-vars */
const express = require("express");
const { HttpCode } = require("../../helpers/constants");
const router = express.Router();
const contactsServices = require("../../model/index");
const {
  validateCreateContact,
  validateUpdateContact,
} = require("../../validation/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await contactsServices.listContacts();
    res.status(HttpCode.OK).json({
      status: "success",
      code: HttpCode.OK,
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
    const contact = await contactsServices.getContactById(
      Number(req.params.contactId)
    );
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
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
    const contact = await contactsServices.addContact(req.body);
    res.status(HttpCode.CREATED).json({
      status: "success",
      code: HttpCode.CREATED,
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
    const contact = await contactsServices.removeContact(
      Number(req.params.contactId)
    );
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
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

router.put("/:contactId", validateUpdateContact, async (req, res, next) => {
  if (!req.body) {
    return next({
      status: HttpCode.BAD_REQUEST,
      message: "Missing fields",
      data: "Not Found",
    });
  }
  try {
    const contact = await contactsServices.updateContact(
      Number(req.params.contactId),
      req.body
    );
    if (contact) {
      res.status(HttpCode.OK).json({
        status: "success",
        code: HttpCode.OK,
        data: {
          contact,
        },
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
