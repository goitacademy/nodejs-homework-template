const express = require("express");
const router = express.Router();
const ContactsAPI = require("../../model/contactsAPI.js");
const validate = require("./validation.js");

router.get("/", async (req, res, next) => {
  try {
    const allContacts = await ContactsAPI.getAll();
    return res.json({
      status: "success",
      code: 200,
      data: {
        allContacts,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const contact = await ContactsAPI.getById(req.params.contactId);
    if (contact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          contact,
        },
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.post("/", validate.addContact, async (req, res, next) => {
  try {
    const newContact = await ContactsAPI.add(req.body);
    return res.json({
      status: "success",
      code: 201,
      data: {
        newContact,
      },
    });
  } catch (err) {
    next(err);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const deletedContact = await ContactsAPI.remove(req.params.contactId);
    if (deletedContact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          deletedContact,
        },
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
});

router.patch("/:contactId", validate.updateContact, async (req, res, next) => {
  try {
    const updatedContact = await ContactsAPI.update(
      req.params.contactId,
      req.body
    );
    if (updatedContact) {
      return res.json({
        status: "success",
        code: 200,
        data: {
          updatedContact,
        },
      });
    } else {
      return res.json({
        status: "error",
        code: 404,
        data: "Not Found",
      });
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
