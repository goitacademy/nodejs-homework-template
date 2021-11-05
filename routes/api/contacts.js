const express = require("express");
const { NotFound } = require("http-errors");
const operations = require("../../model/index.js");
const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const contacts = await operations.listContacts();
    res.json({
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
    const { contactId } = req.params;
    const contact = await operations.getContactById(contactId);
    if (!contact) {
      return NotFound(
        `Contact with ${contactId} not found . Please try to find other contact.`,
      );
    }
    res.json({
      staus: "success",
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
    const body = req.body;
    const contact = await operations.addContact(body);
    res.status(201).json({
      status: "success",
      code: 201,
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
    const { contactId } = req.params;
    const contactDelete = await operations.removeContact(contactId);
    if (!contactDelete) {
      return NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      message: "Contact has been remove",
    });
  } catch (error) {
    next(error);
  }
});

router.patch("/:contactId", async (req, res, next) => {
  try {
    const body = req.body;
    if (!body) {
      return NotFound(`Not found`);
    }
    const { contactId } = req.params;
    const upContact = await operations.updateContact(contactId, body);
    if (!upContact) {
      return NotFound(`Contact with id=${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: {
        upContact,
      },
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
