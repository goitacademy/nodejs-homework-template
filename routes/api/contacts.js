const express = require("express");
const router = express.Router();
const Contacts = require("../../models/contacts");
const validate = require("../../services/validation");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await Contacts.listContacts();
    return res.json({
      status: "Success",
      code: 200,
      message: "Contacts found",
      data: {
        contacts,
      },
    });
  } catch (error) {
    next(error);
  }
  // res.json({message: "template message get"});
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.getContactById(req.params.contactId);
    if (contact) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact found",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
  // res.json({message: "template message/:contactId get"});
});

router.post("/", validate.createContact, async (req, res, next) => {
  try {
    const contact = await Contacts.addContact(req.body);
    return res.status(201).json({
      status: "Success",
      code: 201,
      message: "Contact successfully created",
      data: {
        contact,
      },
    });
  } catch (e) {
    next(e);
  }
  // res.json({message: "template message/"});
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await Contacts.removeContact(req.params.contactId);
    if (contact) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact deleted",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
  // res.json({message: "template message/:contactId del"});
});

router.put("/:contactId", validate.updateContact, async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: "Bad request",
      });
    }
    const contact = await Contacts.updateContact(
      req.params.contactId,
      req.body
    );
    if (contact) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact updated successfully",
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: "Error",
        code: 404,
        message: "Not Found",
      });
    }
  } catch (e) {
    next(e);
  }
  // res.json({message: "template message/:contactId put"});
});

module.exports = router;
