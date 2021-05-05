const express = require("express");
const router = express.Router();
const contacts = require("../../model/index.js");
const validate = require("../../services/validation");

router.get("/", async (req, res, next) => {
  try {
    const contactsList = await contacts.listContacts();
    return res.json({
      status: "Success",
      code: 200,
      message: "Contacts found",
      data: {
        contactsList,
      },
    });
  } catch (e) {
    next(e);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const myContact  = await contacts.getContactById(req.params.contactId);
    if (myContact) {
      return res.json({
        status: "Success",
        code: 200,
        message: "Contact found",
        data: {
          myContact,
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
});

router.post("/", validate.createContact, async (req, res, next) => {
  try {
    const contact = await contacts.addContact(req.body);
    if (contact) {
      return res.status(201).json({
        status: "Success",
        code: 201,
        message: "Contact successfully created",
        data: {
          contact,
        },
      });
    } else {
      return res.status(201).json({
        status: "Error",
        code: 400,
        message: "Missing required name field",
      });
    }
  } catch (e) {
    next(e);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const contact = await contacts.removeContact(req.params.contactId);
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
});

router.put('/:contactId', validate.updateContact, async (req, res, next) => {
  try {
    if (Object.keys(req.body).length === 0) {
      return res.status(400).json({
        status: 'Error',
        code: 400,
        message: 'Bad request',
      });
    }
    const contact = await contacts.updateContact(
      req.params.contactId,
      req.body,
    );
    if (contact) {
      return res.json({
        status: 'Success',
        code: 200,
        message: 'Contact updated successfully',
        data: {
          contact,
        },
      });
    } else {
      return res.status(404).json({
        status: 'Error',
        code: 404,
        message: 'Not Found',
      });
    }
  } catch (e) {
    next(e);
  }
});



module.exports = router;
