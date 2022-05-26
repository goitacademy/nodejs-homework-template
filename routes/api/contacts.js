const express = require("express");
const { NotFound } = require("http-errors");
const router = express.Router();

const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
} = require("../../models/contacts");

router.get("/", async (req, res, next) => {
  try {
    const contacts = await listContacts();

    res.json({
      status: "success",
      code: 200,
      data: contacts,
    });
  } catch (error) {
    next();
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contactItem = await getContactById(contactId);
    if (!contactItem) {
      throw new NotFound(`Contacts with id ${contactId} not found`);
    }
    res.json({
      status: "success",
      code: 200,
      data: contactItem,
    });
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { name, email, phone } = req.body;
    const newContact = await addContact(name, email, phone);

    res.status(201).json({
      status: "created",
      code: "201",
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const oldContact = await removeContact(contactId);
    if (!oldContact) {
      throw new NotFound(`Contacts with id ${contactId} not found`);
    }

    res.json({
      status: "Success",
      message: "Contact successfully deleted",
      code: 200,
      data: oldContact,
    });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const newContact = await updateContact(contactId, req.body);
    if (!newContact) {
      throw new NotFound(`Contacts with id ${contactId} not found`);
    }
    res.json({
      status: "Success",
      message: "Contact successfully updated",
      code: 200,
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
